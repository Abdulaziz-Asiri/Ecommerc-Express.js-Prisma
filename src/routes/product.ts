import {Router} from 'express'
import { errorHandler } from '../error-handler'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProduct,
} from "../controllers/products";
import authMiddelware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin';
import { getPreEmitDiagnostics } from 'typescript';

const productsRoutes:Router = Router()

    productsRoutes.post('/',[authMiddelware, adminMiddleware],errorHandler(createProduct));
    productsRoutes.put('/updateProduct/:id',[authMiddelware, adminMiddleware],errorHandler(updateProduct));
    productsRoutes.delete('/delete/:id',[authMiddelware, adminMiddleware],errorHandler(deleteProduct));
    productsRoutes.get('/list',[authMiddelware, adminMiddleware],errorHandler(listProducts));
    productsRoutes.get('/getProduct/:id',[authMiddelware, adminMiddleware],errorHandler(getProduct));

export default productsRoutes