import {JwtPayload} from "jsonwebtoken";
import {AbstractResponse} from "../../response/AbstractResponse.response";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }

        interface Response {
            sendData(data: AbstractResponse): any
        }
    }
}