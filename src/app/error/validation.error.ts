import {AbstractError} from "@error/abstract.error";
import {ValidationError} from "class-validator";

export class Validation extends AbstractError {
    statusCode = 422;

    constructor(public errorData: ValidationError[]) {
        super('Validation Error');
    }

    generateErrors(): { message: string; errors?: any }[] {
        return [{
            message: 'Validation Error',
            errors: this.getValidationErrorObject()
        }];
    }

    getValidationErrorObject(): Array<{ key: string, message: string }> {
        return this.errorData.map((error) => {
            let errorObj: { key: string, message: string };
            const messages = Object.values(error.constraints!);
            errorObj = {key: error.property, message: messages[0]}
            return errorObj;
        })
    }
}