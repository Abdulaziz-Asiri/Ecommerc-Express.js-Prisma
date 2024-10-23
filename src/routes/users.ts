import { Router } from "express";
import { addAddress, deleteAddress,listAddress, updatUser } from "../controllers/users";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const usersRoutes: Router = Router();

usersRoutes.post("/add-adderss", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete("/delete-adderss/:id", [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get("/adderss", [authMiddleware], errorHandler(listAddress));
usersRoutes.put("/updateUser", [authMiddleware], errorHandler(updatUser));

export default usersRoutes;
