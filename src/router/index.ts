import { type Request, type Response, Router, NextFunction } from "express";
import { UserController } from "../modules/users/userController";
import { AuthController } from "../modules/auth/authController";
import { isUserAdmin, isUserConnected } from "../middelwares";
import { NotFoundError, ErrorHandler } from "../utils";

export const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

router.use(isUserConnected);

router
  .route("/user/:id")
  .get(UserController.getAll)
  .get(UserController.getById)
  .put(UserController.update)
  .delete(UserController.delete);
router.get("/user", isUserAdmin, UserController.getAll);

// router.use("/user", userRoutes);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(req.path));
});

router.use(ErrorHandler.handle());
