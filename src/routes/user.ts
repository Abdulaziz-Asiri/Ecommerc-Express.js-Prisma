import { Router } from "express";
import { addAddress, changeUsesrRole, deleteAddress,listAddress, updatUser,listUsers, getUserById } from "../controllers/user";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";


const usersRoutes: Router = Router();

usersRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete("/address/:id", [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
usersRoutes.put("/", [authMiddleware], errorHandler(updatUser));
usersRoutes.put("/:id/role", [authMiddleware, adminMiddleware], errorHandler(changeUsesrRole));
usersRoutes.get("/",[authMiddleware, adminMiddleware],errorHandler(listUsers));
usersRoutes.get("/:id", [authMiddleware, adminMiddleware], errorHandler(getUserById));

export default usersRoutes;
