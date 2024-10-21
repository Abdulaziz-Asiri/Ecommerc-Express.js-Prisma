import { NextFunction, Request, Response } from "express";
import { prismaCilent } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async(req:Request, res:Response) => {

    // Create a validator to for this request
    const product = await prismaCilent.product.create({
      data: {
        ...req.body,
        tags: req.body.tags.join(","),
      },
    });
    res.json(product)
}


export const updateProduct = async(req:Request, res:Response) => {
  try{
    const product = req.body;
    if(product.tags){
      product.tags = product.tags.join(',')
    }
    const updateProduct = await prismaCilent.product.update({
      where:{
        id: +req.params.id
      },
      data: product
    })
    res.json(updateProduct)

  }catch(err){
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
  }
}
export const deleteProduct = async(req:Request, res:Response) => {
   
}

export const listProducts = async(req:Request, res:Response) => {
  const count = await prismaCilent.product.count()
  const products = await prismaCilent.product.findMany({
    skip: +req.query.skip || 0,
    take:5 
  })
  res.json({
    count, data:products
  })
}
export const getProduct = async(req:Request, res:Response) => {
  try{
    const product = await prismaCilent.product.findFirstOrThrow({
      where:{
        id: +req.params.id
      }
    })
    res.json(product)

  }catch(error){
    throw new NotFoundException('there is no product', ErrorCode.PRODUCT_NOT_FOUND)
  }
}
