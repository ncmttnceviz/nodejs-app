import {NextFunction, Request, Response} from "express";
import {AbstractResponse} from "../../response/AbstractResponse.response";

export const responseOrganizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.sendData = (data: AbstractResponse) => {
        const statusCode = data.statusCode;
        delete data.statusCode
            res.status(statusCode ?? 200)
            .json(data)
    };
    next();
}