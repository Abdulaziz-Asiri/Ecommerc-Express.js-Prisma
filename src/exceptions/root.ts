
class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;
    errors:any;

    constructor(message:string, errorCode: any, statusCode:number, errorS: any){
        super(message)
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errorS;
    }
}

export enum ErrorCodes{
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS =1002,
    INCORRECT_PASSWORD = 1003,
}

//49:53 error handler