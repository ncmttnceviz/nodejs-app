import cors from 'cors';
import {Application, json, urlencoded} from "express";
import {errorHandler} from "@middleware/error-handler.middleware";
import {postgresConnect} from "@config/postgres.config";
import {mongoConnect} from "@config/mongo.config";
import {elasticConnect} from "@config/elastic.config";
import {sentryConnect} from "@config/sentry.config";
import {rabbitMqConnect} from "@config/rabbitmq.config";
import {RabbitmqSetup} from "@app/services/rabbitmq/rabbitmq.setup";
import {redisConnection} from "@config/redis.config";
import {routesIndex} from "./routes/index.router";
import fileUpload from 'express-fileupload'
import {responseOrganizerMiddleware} from "@middleware/response-organizer.middleware";

export class App {
    constructor(public app: Application) {
        app.set('trust-proxy', true);
        app.use(cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200
        }));

        app.use(responseOrganizerMiddleware)
        app.use(urlencoded({extended: false}));
        app.use(json())
        app.use(fileUpload({
            createParentPath: true,
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))

        app.use(routesIndex);
        app.use(errorHandler)
    }


    async checkConfigs() {
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
        await this.checkConfigs();
        const port = process.env.APP_PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server Running : http://localhost:${port}`)
        })
    }
}