import { type Request, type Response, Router, NextFunction } from "express";
export const router = Router();
import { UserController } from "../modules/users/userController";
import { AuthController } from "../modules/auth/authController";
import { isAdmin, isConnected } from "../middelwares";

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

router.use(isConnected);

router
  .route("/user/:id")
  .get(UserController.getAll)
  .get(UserController.getById)
  .put(UserController.update)
  .delete(UserController.delete);
router.get("/user", isAdmin, UserController.getAll);

// router.use("/user", userRoutes);
