import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {JwtPayload} from 'jsonwebtoken';
import {AuthorizationError} from "@error/authorization.error";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization

    if (typeof accessToken === 'string') {
        const token = accessToken.split(' ')
        try {
            req.user = jwt.verify(token[1], process.env.JWT_KEY!) as JwtPayload
            return next()
        } catch (e) {
            return next(new AuthorizationError())
        }
    }

    return next(new AuthorizationError())
}

