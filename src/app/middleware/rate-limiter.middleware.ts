import {NextFunction, Request, Response} from "express";
import {redisClient} from "@config/redis.config";
import {ManyRequestError} from "@error/many-request.error";

export const RateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.path + req.ip.toString().replace('::', '');
    let limitData = await redisClient.get(key)

    if (limitData) {
        if (parseInt(limitData) + 1 > limitConfig.limit) {
            return next(new ManyRequestError());
        }

        const ttl = await redisClient.ttl(key)
        await redisClient.set(key, parseInt(limitData) + 1, {
            EX: ttl
        })

        return next();
    }

    limitData = await redisClient.set(key, 1, {
        EX: limitConfig.time
    })
    return next()
}

const limitConfig = {
    time: 30,
    limit: 5
}