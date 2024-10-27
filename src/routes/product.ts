import {Router} from 'express'
import { errorHandler } from '../error-handler'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  listProducts,
  getProductById,
  searchProducts,
} from "../controllers/product";
import authMiddelware from '../middlewares/auth'
import adminMiddleware from '../middlewares/admin';

const productsRoutes:Router = Router()

    productsRoutes.post('/',[authMiddelware, adminMiddleware],errorHandler(createProduct));
    productsRoutes.put('/:id',[authMiddelware, adminMiddleware],errorHandler(updateProduct));
    productsRoutes.delete('/:id',[authMiddelware, adminMiddleware],errorHandler(deleteProduct));
    productsRoutes.get('/',[authMiddelware, adminMiddleware],errorHandler(listProducts));
    productsRoutes.get('/:id',[authMiddelware, adminMiddleware],errorHandler(getProductById));
    productsRoutes.get('/search', [authMiddelware], errorHandler(searchProducts))


    
export default productsRoutes