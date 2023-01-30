import {DataSource} from "typeorm";
import {appHelper} from "@helper/app.helper";

export const postgres = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT!),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DATABASE,
    entities: ['./dist/**/*.entity.js'],
    synchronize: true,
    cache: {
        type: "redis",
        options: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT!),
            user: process.env.REDIS_USER,
            password: process.env.REDIS_PASS,
            prefix: 'query'
        },
        duration: 30000,
    }
})

export const postgresConnect = async () => {
    const envFields = ['PG_HOST', 'PG_PORT', 'PG_USER', 'PG_PASS', 'PG_DATABASE'];
    appHelper.checkEnvFields(envFields);
    return await postgres.initialize().catch((err) => {
        throw new Error('Postgres Connection Error')
    })
}
