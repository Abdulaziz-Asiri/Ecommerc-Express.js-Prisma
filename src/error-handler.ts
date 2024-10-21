import { Request,Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (mehtod:Function) => {
    return(req: Request, res: Response, next: NextFunction) => {
        try{
            mehtod(req, res, next)
        }catch(error: any){
            let exception: HttpException;
            if(error instanceof HttpException){
                exception = error;
            }else{
                exception = new InternalException(
                  "Somthine went wrong!",
                  error,
                  ErrorCode.INTERNAL_EXCEPTION
                );
            }
            next(exception)
        }
    }
}
