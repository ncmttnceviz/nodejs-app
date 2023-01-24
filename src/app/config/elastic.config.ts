import {Client} from "@elastic/elasticsearch";
import {appHelper} from "@helper/app.helper";

export const elastic = new Client({
    node: `${process.env.ELASTIC_URI}:${process.env.ELASTIC_PORT}`
})

export const elasticConnect = async () => {
    const envFields = ['ELASTIC_URI', 'ELASTIC_PORT']
    appHelper.checkEnvFields(envFields)
    return await elastic.ping().catch(() => {
        throw new Error('Elasticsearch Connection Error')
    })
}

