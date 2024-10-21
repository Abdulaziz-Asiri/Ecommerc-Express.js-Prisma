import { Request,Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import {ZodError} from "zod"
import { BadRequestException } from "./exceptions/badRequests";

export const errorHandler = (mehtod:Function) => {
    return(req: Request, res: Response, next: NextFunction) => {
        try{
            mehtod(req, res, next)
        }catch(error: any){
            let exception: HttpException;
            if(error instanceof HttpException){
                exception = error;
            }else{
                if(error instanceof ZodError){
                    exception = new BadRequestException('Unprocessable entity.', ErrorCode.UNPROCESSABLE_ENTITY)
                }else{
                    exception = new InternalException(
                      "Somthine went wrong!",
                      error,
                      ErrorCode.INTERNAL_EXCEPTION
                    );
                }
            }
            next(exception)
        }
    }
}
