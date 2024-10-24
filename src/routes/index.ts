import { Router } from 'express';
import { signup } from '../controllers/auth';
import authRoutes from "./auth";
import productsRoutes from './product';
import usersRoutes from './users';
import cartRoutes from './cart';
import orderRoutes from "./order";

const rootRouter:Router = Router()

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productsRoutes);
rootRouter.use("/users", usersRoutes);
rootRouter.use("/cart", cartRoutes);
rootRouter.use("/order", orderRoutes);

export default rootRouter;

