export abstract class AbstractError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);
    }

    abstract generateErrors() : { message: string; errorCode?:string, errors?: Array<object> }[]
}