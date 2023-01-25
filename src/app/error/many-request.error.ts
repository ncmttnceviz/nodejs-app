import {AbstractError} from "@error/abstract.error";
import {languageService} from "../services/language.service";

export class ManyRequestError extends AbstractError {
    statusCode = 429;

    constructor(public message = languageService.trans('tooManyRequest')) {
        super(message);
    }

    generateErrors(): { message: string; errorCode?: string; errors?: Array<object> }[] {
        return [{
            message: this.message
        }];
    }

}