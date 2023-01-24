import cors from 'cors';
import {Application, json, urlencoded} from "express";
import {errorHandler} from "@middleware/error-handler.middleware";
import {postgresConnect} from "@config/postgres.config";
import {mongoConnect} from "@config/mongo.config";
import {elasticConnect} from "@config/elastic.config";
import {sentryConnect} from "@config/sentry.config";
import {rabbitMqConnect} from "@config/rabbitmq.config";
import {RabbitmqSetup} from "./app/services/rabbitmq/rabbitmq.setup";
import {redisConnection} from "@config/redis.config";
import {routesIndex} from "./routes/index.router";

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

        app.use(routesIndex);
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

        new RabbitmqSetup(connections[4])
    }

    async start() {
        await this.loadConfigs();
        const port = process.env.APP_PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server Running : http://localhost:${port}`)
        })
    }
}