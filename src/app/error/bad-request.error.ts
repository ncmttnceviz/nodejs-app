import {AbstractError} from "@error/abstract.error";

export class BadRequest extends AbstractError {
    statusCode = 400;

    constructor(
        public message: string,
        public errorCode: string
    ) {
        super(message);
    }

    generateErrors(): { message: string, errorCode?: string, errors?: [] }[] {
        return [{
            message: this.message,
            errorCode: this.errorCode
        }];
    }
}