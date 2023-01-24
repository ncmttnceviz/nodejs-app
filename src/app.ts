import cors from 'cors';
import {Application, json, urlencoded} from "express";
import {errorHandler} from "@middleware/error-handler.middleware";
import {testRouter} from "./routes/testRouter";
import {postgresConnect} from "@config/postgres.config";
import {mongoConnect} from "@config/mongo.config";
import {elasticConnect} from "@config/elastic.config";
import {sentryConnect} from "@config/sentry.config";
import {rabbitMqConnect} from "@config/rabbitmq.config";
import {RabbitmqSetup} from "./app/services/rabbitmq/rabbitmq.setup";
import {redisConnection} from "@config/redis.config";

export class App {
    constructor(public app: Application) {
        app.set('trust-proxy', true);
        app.use(cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200
        }));

        app.use(urlencoded({extended: false}));
        app.use(json())

        app.use(testRouter);
        app.use(errorHandler)
    }


    async loadConfigs() {
        const connections = await Promise.all([
            postgresConnect(),
            mongoConnect(),
            elasticConnect(),
            sentryConnect(),
            rabbitMqConnect(),
            redisConnection()
        ])
        const rabbitMq = connections[4];
        const rabbitMqSetup = new RabbitmqSetup(rabbitMq)
    }

    async start() {
        await this.loadConfigs();
        const port = process.env.APP_PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server Running : http://localhost:${port}`)
        })
    }
}