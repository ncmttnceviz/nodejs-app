import {NextFunction, Request, Response} from "express";
import {redisClient} from "@config/redis.config";
import {languageService} from "../app/services/language.service";
import {queueService} from "../app/services/queue.service";
import {testProcessor} from "../processcor/test.processcor";

export class TestController {
    async index(req: Request, res: Response, next: NextFunction){
        const t = languageService.trans('test');
        const cacheData = {
            'assadsd' : 'asdasd'
        }

        //const command = queueService.sendCommand(testProcessor,cacheData);

        //console.log(command)
        //const test = await redisClient.set('testKey',JSON.stringify(cacheData))
        res.status(200).json(t)
    }

    async queue(req: Request, res: Response, next: NextFunction){
       // testProducer.sendCommand();
    }

    async consumer(req:Request, res:Response, next: NextFunction){
       // testProducer.process()
    }
}

export const testController = new TestController();