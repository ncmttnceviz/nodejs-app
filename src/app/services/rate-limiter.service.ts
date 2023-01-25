import {redisClient} from "@config/redis.config";

export class RateLimiterService {
    async Limiter(key: string, limit: number, time: number): Promise<boolean> {
        const data = await this.getLimitData(key, time)
        return parseInt(data!) + 1 > limit;
    }

    private async getLimitData(key: string, time: number): Promise<string | null> {
        let limitData = await redisClient.get(key)
        if (limitData) {
            const ttl = await redisClient.ttl(key)
            await redisClient.set(key, parseInt(limitData) + 1, {
                EX: ttl
            })
            return limitData;
        }

        return limitData = await redisClient.set(key, 1, {
            EX: time
        })
    }
}

export const rateLimiter = new RateLimiterService();