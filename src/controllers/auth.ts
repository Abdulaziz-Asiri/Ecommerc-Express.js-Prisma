import { Request,Response } from "express";
import { prismaCilent } from "..";
import {hashSync, compareSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../secrets";


export const signup = async (req:Request, res:Response) =>{
    try{
        const { email, password, username } = req.body;

        let existingUser = await prismaCilent.user.findFirst({where:{email}})
        if (existingUser) {
            res.status(400).json({
                status:400,
                message: "User is alread exit"
            });
            return;
        }

        const user = await prismaCilent.user.create({
          data: {
            username,
            email,
            password: hashSync(password, 10),
          },
        });
    res.status(200).json({
        status: 201,
        success: true,
        message: "User created successfully",
        user: user,
    });

    }catch(error: any) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: error.message.toString(),
        })
    }
}

export const login = async (req:Request, res:Response) =>{
    try{
        const {email, password} = req.body;

        let user = await prismaCilent.user.findFirst({where: {email}})
        if(!user){
            res.status(400).json({
              status: 400,
              message: "Please Enter the credential",
            });
            return;
        }
        if(!compareSync(password, user.password)){
            res.status(403).json({
              status: 403,
              message: "email or password is not correct",
            });
            return;
        }
        const token = jwt.sign({
            userId: user.id
        },JWT_SECRET)
        res.json({user, token})
        
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