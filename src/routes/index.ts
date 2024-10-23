import { Router } from 'express';
import { signup } from '../controllers/auth';
import authRoutes from "./auth";
import productsRoutes from './product';
import usersRoutes from './users';

const rootRouter:Router = Router()

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes);
rootRouter.use("/users", usersRoutes);

export default rootRouter;

