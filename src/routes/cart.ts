import { Router } from "express";
import {addItemToCart, changeQuantity, deleteItemfromCart, getCart} from "../controllers/cart";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";


const cartRoutes:Router = Router()

cartRoutes.post('/Create-cart', [authMiddleware], errorHandler(addItemToCart))
cartRoutes.get('/getCart', [authMiddleware], errorHandler(getCart))
cartRoutes.delete("/deleteCart/:id", [authMiddleware], errorHandler(deleteItemfromCart));
cartRoutes.put('/updateCart/:id', [authMiddleware], errorHandler(changeQuantity))

export default cartRoutes