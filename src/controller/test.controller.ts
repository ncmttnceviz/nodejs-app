import {NextFunction, Request, Response} from "express";

export class TestController {
    async index(req: Request, res: Response, next: NextFunction){
        res.status(200).json('here is index function')
    }
}

export const testController = new TestController();