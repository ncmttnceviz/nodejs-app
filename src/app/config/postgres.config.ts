import {DataSource} from "typeorm";
import {appHelper} from "@helper/app.helper";

export const postgres = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST!,
    port: parseInt(process.env.PG_PORT!),
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DATABASE,
    entities: ['./dist/**/*.entity.js']
})

export const postgresConnect = async () => {
    const envFields = ['PG_HOST', 'PG_PORT', 'PG_USER', 'PG_PASS', 'PG_DATABASE'];
    appHelper.checkEnvFields(envFields);
    await postgres.initialize().catch(() => {throw new Error('Postgres Connection Error') })
}
