import {AbstractError} from "@error/abstract.error";
import {ValidationError} from "class-validator";

export class Validation extends AbstractError {
    statusCode = 422;

    constructor(public errorData: ValidationError[], public message = 'Validation Error') {
        super(message);
    }

    generateErrors(): { message: string; errors?: Array<object> }[] {
        return [{
            message: this.message,
            errors: this.getValidationErrorObject()
        }];
    }

    getValidationErrorObject(): Array<{ key: string, message: string }> {
        return this.errorData.map((error) => {
            let errorObj: { key: string, message: string };
            const messages = Object.values(error.constraints!);
            return  {key: error.property, message: messages[0]}
        })
    }
}