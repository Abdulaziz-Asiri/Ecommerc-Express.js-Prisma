import { NextFunction, Request, Response } from "express";
import { prismaCilent } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Prisma } from "@prisma/client";

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
export const getProductById = async(req:Request, res:Response) => {
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

// export const searchProducts = async (req: Request, res: Response) => {
//   try {
//     const searchTerm = req.params.query; // Ensure this is the correct query parameter

//     // Transform the search term into a format suitable for to_tsquery
//     const formattedSearchTerm = searchTerm.split(" ").join(" & ");

//     const searchResults = await prismaCilent.$queryRaw`
//       SELECT * FROM "product"
//       WHERE to_tsvector('english', "name" || ' ' || "description" || ' ' || "tags") 
//       @@ to_tsquery('english', ${formattedSearchTerm});
//     `;

//     res.json(searchResults);
//   } catch (error) {
//     res.status(500).json({ error: "Error executing search" });
//   }
// };

//TODO
export const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    console.log("Query Text",searchTerm)
    const searchResults = await prismaCilent.$queryRaw`
      SELECT * FROM "products"
      WHERE to_tsvector('english', "name" || ' ' || "description" || ' ' || "tags") 
      @@ plainto_tsquery(${searchTerm});
    `;

    res.json(searchResults);
  } catch (error) {
    console.error("Error executing full-text search:", error);
    res.status(500).json({ error: "Error executing full-text search" });
  }
};
