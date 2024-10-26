import { NextFunction, Request, Response } from "express";
import { prismaCilent } from "..";
import {hashSync, compareSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";
import { BadRequestException } from "../exceptions/badRequests";
import {ErrorCode} from '../exceptions/root'
import { UprocessableEntity } from "../exceptions/validation";
import { SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { produceMessage } from "../kafka/producer";


export const signup = async (req:Request, res:Response ,next: NextFunction) =>{
    try{
        SignupSchema.parse(req.body)
        const { email, password, username } = req.body;

        let existingUser = await prismaCilent.user.findFirst({where:{email}})
        if (existingUser) {
           next(new BadRequestException("User is alreay exists!!", ErrorCode.USER_ALREADY_EXISTS));
        }

        const user = await prismaCilent.user.create({
          data: {
            username,
            email,
            password: hashSync(password, 10),
          },
        });
        await produceMessage("user-topic", { event: "User SingUP successflly", user });
    res.status(200).json({
        status: 200,
        success: true,
        message: "User created successfully",
        user: user,
    });

    }catch(err:any) {
        next(new UprocessableEntity(err?.issues, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY));
    }
}

export const login = async (req:Request, res:Response) =>{
    try{
        const {email, password} = req.body;

        let user = await prismaCilent.user.findFirst({where: {email}})
        if(!user){
           throw new NotFoundException(
             "User not found!",
             ErrorCode.USER_NOT_FOUND
           );
        }
        if(!compareSync(password, user.password)){
            throw new BadRequestException(
              "Incorrect password!",
              ErrorCode.INCORRECT_PASSWORD
            );
        }
        const token = jwt.sign({
            userId: user.id
        },JWT_SECRET)
        res.json({user, token})
        await produceMessage("user-topic", { event: "USER-LOGGEDIN", user });
        res.status(200).json(user).end();
        return;
        
    }catch(error:any){
        console.log(error)
        res.status(400).json({
            status:400,
            message: error.message.toString()
        })
    }
}

export const me = async (req: Request, res:Response) =>{
    res.json(req.user)
}