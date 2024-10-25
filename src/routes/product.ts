import {Router} from 'express'
import { errorHandler } from '../error-handler'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProductById,
  searchProducts,
} from "../controllers/products";
import authMiddelware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin';

const productsRoutes:Router = Router()

    productsRoutes.post('/',[authMiddelware, adminMiddleware],errorHandler(createProduct));
    productsRoutes.put('/updateProduct/:id',[authMiddelware, adminMiddleware],errorHandler(updateProduct));
    productsRoutes.delete('/delete/:id',[authMiddelware, adminMiddleware],errorHandler(deleteProduct));
    productsRoutes.get('/list',[authMiddelware, adminMiddleware],errorHandler(listProducts));
    productsRoutes.get('/getProduct/:id',[authMiddelware, adminMiddleware],errorHandler(getProductById));
    productsRoutes.get('/search', [authMiddelware], errorHandler(searchProducts))


    
export default productsRoutes