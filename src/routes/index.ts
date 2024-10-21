import { Router } from 'express';
import { signup } from '../controllers/auth';
import authRoutes from "./auth";
import productsRoutes from './product';

const rootRouter:Router = Router()

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes);

export default rootRouter;

