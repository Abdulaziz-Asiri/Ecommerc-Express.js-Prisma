import { Request, Response } from "express";
import { prismaCilent } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CreateCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";


export const addItemToCart = async (req: Request, res: Response) =>{
    const validateData = CreateCartSchema.parse(req.body)
    let product: Product;
    try{
        product = await prismaCilent.product.findFirstOrThrow({
            where:{
                id: validateData.productId
            }
        })
    }catch(err){
        throw new NotFoundException('Product not found!', ErrorCode.PRODUCT_NOT_FOUND)
    }
    const cart = await prismaCilent.cartItem.create()
}
export const deteteItemfromCart = async (req: Request, res: Response) =>{

}
export const changeQuantity = async (req: Request, res: Response) =>{

}
export const getCart = async (req: Request, res: Response) =>{

}