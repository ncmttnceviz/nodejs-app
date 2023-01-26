import {AbstractResponse} from "./AbstractResponse.response";

export class BasicResponse extends AbstractResponse {
    statusCode = 200
    message: string
    data: any

    setMessage(message: string): this {
        this.message = message
        return this
    }

    setStatusCode(statusCode: number): this {
        this.statusCode = statusCode;
        return this
    }

    setData(data: any): this {
        this.data = data
        return this;
    }
}