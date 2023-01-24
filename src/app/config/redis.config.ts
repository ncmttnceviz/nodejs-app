import {createClient} from "redis";
import {appHelper} from "@helper/app.helper";

export const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT!)
    },
    password: process.env.REDIS_PASS
})

export const redisConnection = async () => {
    const envFields = ['REDIS_HOST', 'REDIS_PORT', 'REDIS_PASS']
    appHelper.checkEnvFields(envFields)
    return redisClient.connect().catch(() => {
        throw new Error('Redis Connection Error')
    })
}