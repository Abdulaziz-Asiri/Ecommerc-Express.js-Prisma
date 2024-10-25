import { Router } from "express";
import { addAddress, changeUsesrRole, deleteAddress,listAddress, updatUser,listUsers } from "../controllers/users";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";


const usersRoutes: Router = Router();

usersRoutes.post("/add-adderss", [authMiddleware], errorHandler(addAddress));
usersRoutes.delete("/delete-adderss/:id", [authMiddleware], errorHandler(deleteAddress));
usersRoutes.get("/adderss", [authMiddleware], errorHandler(listAddress));
usersRoutes.put("/updateUser", [authMiddleware], errorHandler(updatUser));
usersRoutes.put("/changeRole/:id", [authMiddleware, adminMiddleware], errorHandler(changeUsesrRole));
usersRoutes.get("/listUsers",[authMiddleware, adminMiddleware],errorHandler(listUsers));
usersRoutes.get("/getUser/:id", [authMiddleware, adminMiddleware], errorHandler(changeUsesrRole));

export default usersRoutes;
