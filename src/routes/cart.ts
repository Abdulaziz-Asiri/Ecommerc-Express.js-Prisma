import { Router } from "express";
import {addItemToCart, changeQuantity, deleteItemfromCart, getCart} from "../controllers/cart";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";


const cartRoutes:Router = Router()

cartRoutes.post('/', [authMiddleware], errorHandler(addItemToCart))
cartRoutes.get('/', [authMiddleware], errorHandler(getCart))
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemfromCart));
cartRoutes.put('/:id', [authMiddleware], errorHandler(changeQuantity))

export default cartRoutes