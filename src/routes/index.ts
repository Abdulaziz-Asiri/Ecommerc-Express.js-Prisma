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


//   1. user management
//         a. list users
//         c. get user by id
//         b. change user role
//     2. order management
//         a. list all orders (filter on status)
//         b. change order status
//         c. list all orders of given user
//     3. products
//         a. search api for products (for both users and admins) -> full text search   
//