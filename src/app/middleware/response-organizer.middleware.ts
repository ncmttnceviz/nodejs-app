import {NextFunction, Request, Response} from "express";
import {ResponseOrganizer} from "@app/services/response-organizer.service";

export const responseOrganizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.sendData = (data: ResponseOrganizer) => {
        const statusCode = data.statusCode;
        delete data.statusCode
            res.status(statusCode ?? 200)
            .json(data)
    };
    next();
}