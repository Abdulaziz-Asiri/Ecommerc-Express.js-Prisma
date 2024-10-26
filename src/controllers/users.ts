import { Request, Response } from "express";
import { prismaCilent } from "..";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Address} from "@prisma/client";
import { BadRequestException } from "../exceptions/badRequests";
import { produceMessage } from "../kafka/producer";

export const addAddress = async(req:Request, res:Response) => {
    AddressSchema.parse(req.body)

    const address = await prismaCilent.address.create({
        data:{
            ...req.body,
            userId: req.user.id
        }
    })
    await produceMessage("user-topic", {
      event: "Address Add Successfully!!",
      address,
    });
    res.json(address)
} 

export const deleteAddress = async (req: Request, res: Response)=>{
    try{
        await prismaCilent.address.delete({
            where:{
                id: +req.params.id
            }
        })
        res.json({success: true})
    }catch(err){
        throw new NotFoundException('Address not found.', ErrorCode.ADDRESS_NOT_FOUND)
    }
}

export const listAddress = async (req:Request, res:Response) =>{
    try{
        const addresses = await prismaCilent.address.findMany({
        where:{
            userId: req.user.id
        }
    })
    res.json(addresses);
    }catch(err){
        throw new NotFoundException('There is no Addrss', ErrorCode.ADDRESS_NOT_FOUND)
    }

}

export const updatUser = async (req:Request, res:Response) => {
    const validatedData = UpdateUserSchema.parse(req.body)
        let shippingAddress: Address;
        let billingAddress: Address;
    if(validatedData.defaultShippingaddress){
        try {
          shippingAddress = await prismaCilent.address.findFirstOrThrow({
            where: {
              id: validatedData.defaultShippingaddress,
            },
          });
          
          
        } catch (error) {
          throw new NotFoundException(
            "Addrss Not Found",
            ErrorCode.ADDRESS_NOT_FOUND
          );
        }if(shippingAddress.userId != req.user.id){
            throw new BadRequestException(
              "Adress does not blonge to user",
              ErrorCode.ADDRESS_DOES_NOT_BELONG
            );}
    }
    if (validatedData.defaultBillingAddress) {
      try {
        billingAddress = await prismaCilent.address.findFirstOrThrow({
          where: {
            id: validatedData.defaultBillingAddress,
          },
        });
      } catch (error) {
        throw new NotFoundException(
          "Addrss Not Found",
          ErrorCode.ADDRESS_NOT_FOUND
        );
      }
      if (billingAddress.userId != req.user.id) {
        throw new BadRequestException(
          "Address does not blonge to user",
          ErrorCode.ADDRESS_DOES_NOT_BELONG
        );
      }
    }
    const updatedUser = await prismaCilent.user.update({
      where: {
        id: req.user.id,
      },
      data: validatedData,
    });
    res.json(updatedUser);
}

export const listUsers = async (req: Request, res: Response) => {
  const users = await prismaCilent.user.findMany({
    skip: +req.query.skip || 0,
    take: 5,
  });
  res.json(users);
};


export const getUserById = async (req:Request, res:Response) =>{
  try{
    const user = await prismaCilent.user.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
      include: {
        address: true,
        orders: true,
      },
    });
    res.json(user)

  }catch(error){
    throw new NotFoundException("User not Found!!", ErrorCode.USER_NOT_FOUND)
  } 
  
}
export const changeUsesrRole = async (req:Request, res:Response) =>{
   
  try{
    const user = await prismaCilent.user.update({
      where: {
        id: +req.params.id
      },
      data: {
        role: req.body.role
      }
    })
    await produceMessage("user-topic", {
      event: "User Role Changed Successfully!!",
      user,
    });
    res.json(user)

  }catch(error){
    throw new NotFoundException("User not Found", ErrorCode.USER_NOT_FOUND)
  }
}
