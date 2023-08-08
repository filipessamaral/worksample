import { Router } from "express";
import UsersControllers from "../Controllers/User";
import userValidationMiddleware from "../Middleware/userValidationMiddleware";

const router = Router();

router.get("/", UsersControllers.getUsersController);
router.post("/", userValidationMiddleware, UsersControllers.postUserController);

export default router;
