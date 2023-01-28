import {JwtPayload} from "jsonwebtoken";
import {ResponseOrganizer} from "@app/services/response-organizer.service";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }

        interface Response {
            sendData(data: ResponseOrganizer): any
        }
    }
}