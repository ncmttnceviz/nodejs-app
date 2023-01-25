import {NextFunction, Request, Response} from "express";
import {redisClient} from "@config/redis.config";
import {languageService} from "../app/services/language.service";
import {queueService} from "../app/services/queue.service";
import {testProcessor} from "../processcor/test.processcor";
import {UploadedFile} from "express-fileupload";
import path from "path";
import {BadRequest} from "@error/bad-request.error";
import {fileUploader} from "@helper/FileUploader";

export class TestController {
    async index(req: Request, res: Response, next: NextFunction){
        if (!req.files?.file) return next(new BadRequest('Files Required', 'asd'))

        const file = req.files.file as UploadedFile[]
        console.log(  fileUploader.uploadMultipleFile(file, 'avatar'))
        const t = languageService.trans('test');
        const cacheData = {
            'assadsd' : 'asdasd'
        }

        //const command = queueService.sendCommand(testProcessor,cacheData);

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