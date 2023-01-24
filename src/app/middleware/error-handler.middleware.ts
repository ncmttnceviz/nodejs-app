import * as Sentry from '@sentry/node';
import {NextFunction, Request, Response} from "express";
import {AbstractError} from "@error/abstract.error";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {

    if (error instanceof AbstractError) {
        return res.status(error.statusCode).send(error.generateErrors())
    }

    const errorData = process.env.APP_ENV === 'dev' ? {
        message: error.message,
        trace: error.stack
    } : {message: 'Something Went Wrong'};

    if (process.env.APP_ENV === 'prod') Sentry.captureException(errorData);
    res.status(500).json(errorData)
}

