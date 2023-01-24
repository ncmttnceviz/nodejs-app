import * as mongoose from "mongoose";
import {appHelper} from "@helper/app.helper";

export const mongo = async () => {
    await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`)
}

export const mongoConnect = async () => {
    const envFields = ['MONGO_HOST', 'MONGO_USER', 'MONGO_PASS', 'MONGO_PORT'];
    appHelper.checkEnvFields(envFields);
    return await mongo().catch(() => {
        throw new Error('Mongodb Connection Error')
    })
}