import {AbstractError} from "@error/abstract.error";
import {languageService} from "../services/language.service";

export class AuthorizationError extends AbstractError {
    statusCode = 401;

    constructor(public message = languageService.trans('requireAuth')) {
        super(message);
    }

    generateErrors(): { message: string; errorCode?: string; errors?: [] }[] {
        return [{
            message: this.message
        }];
    }

}