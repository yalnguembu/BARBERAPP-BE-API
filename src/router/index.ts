import { type Request, type Response, Router, NextFunction } from "express";
import express from "express";
import { join } from "path";

import { AuthController } from "../modules/auth";
import { UserController } from "../modules/users";
import { ServiceController } from "../modules/services";
import { CategoryController } from "../modules/categories";
import { ReservationController } from "../modules/reservations";
import { isUserAdmin, isUserConnected } from "../middelwares";
import { NotFoundError, ErrorHandler } from "../utils";

export const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.post("/auth/verify-token", AuthController.verifyToken);

router.use("/storage", express.static("public"));
router.use(isUserConnected);

router
  .route("/user/:id")
  .get(UserController.getById)
  .put(UserController.update)
  .delete(UserController.delete);
router.get("/users", isUserAdmin, UserController.getAll);

router.post("/category", CategoryController.create);
router
  .route("/category/:id")
  .put(CategoryController.update)
  .delete(CategoryController.delete);
router.get("/categories", CategoryController.getAll);

router.post("/service", isUserAdmin, ServiceController.create);
router
  .route("/service/:id")
  .get(ServiceController.getById)
  .put(ServiceController.update)
  .delete(ServiceController.delete);
router.get("/services", isUserConnected, ServiceController.getAll);

router
  .post("/reservation", ReservationController.create)
  .get("/reservations", isUserAdmin, ReservationController.getAll);

router
  .route("/reservation/:id")
  .get(ReservationController.getById)
  .put(ReservationController.update)
  .delete(ReservationController.delete);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`'${req.baseUrl}'`));
});

router.use(ErrorHandler.handle());
