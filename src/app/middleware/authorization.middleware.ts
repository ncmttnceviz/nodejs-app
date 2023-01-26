import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';
import {JwtPayload} from 'jsonwebtoken';
import {AuthorizationError} from "@error/authorization.error";
import {userTokenRepository} from "@repository/user-token.repository";

export const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization

    if (typeof accessToken === 'string') {
        const token = accessToken.replace('Bearer ', '')
        try {
            req.user = jwt.verify(token, process.env.JWT_KEY!) as JwtPayload
            const expireDate = await userTokenRepository.getExpireDateFromToken(token)
            if (!expireDate) return next(new AuthorizationError())
            const today = new Date();
            if (expireDate.expireDate < today) return next(new AuthorizationError())
            return next()
        } catch (e) {
            return next(new AuthorizationError())
        }
    }

    return next(new AuthorizationError())
}

