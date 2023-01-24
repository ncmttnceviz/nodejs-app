import {AbstractError} from "@error/abstract.error";
import {languageService} from "../services/language.service";

export class AuthorizationError extends AbstractError{
    statusCode = 401;

    constructor() {
        super(languageService.trans('requireAuth'));
    }

    generateErrors(): { message: string; errorCode?: string; errors?: [] }[] {
        return [{
            message: languageService.trans('requireAuth')
        }];
    }

}