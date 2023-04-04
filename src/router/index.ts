import { type Request, type Response, Router, NextFunction } from "express";
import express from "express";
import multer from "multer";

const upload = multer({ dest: `${__dirname}/public/images/services/` });

import { AuthController } from "../modules/auth";
import { UserController } from "../modules/users";
import { ServiceController } from "../modules/services";
import { CategoryController } from "../modules/categories";
import { ReservationController } from "../modules/reservations";
import {
  isUserAdmin,
  isUserConnected,
  uploadServiceImage,
} from "../middelwares";
import { NotFoundError, ErrorHandler } from "../utils";

export const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);
router.post("/auth/verify-token", AuthController.verifyToken);

router.use("/storage", express.static("public"));

router.get("/user/:id", isUserConnected, UserController.getById);
router.put("/user/:id", isUserConnected, UserController.update);
router.delete("/user/:id", isUserConnected, UserController.delete);
router.get("/users", isUserConnected, isUserAdmin, UserController.getAll);

router.post(
  "/category",
  isUserConnected,
  isUserAdmin,
  CategoryController.create
);
router.put(
  "/category/:id",
  isUserConnected,
  isUserAdmin,
  CategoryController.update
);
router.delete(
  "/category/:id",
  isUserConnected,
  isUserAdmin,
  CategoryController.delete
);
router.get(
  "/categories",
  isUserConnected,
  isUserAdmin,
  CategoryController.getAll
);

router.post(
  "/service",
  isUserConnected,
  isUserAdmin,
  uploadServiceImage.single("picture"),
  ServiceController.create
);

router.get("/service/:id", isUserConnected, ServiceController.getById);
router.put(
  "/service/:id",
  isUserConnected,
  isUserAdmin,
  uploadServiceImage.single("picture"),
  ServiceController.update
);
router.delete(
  "/service/:id",
  isUserConnected,
  isUserAdmin,
  ServiceController.delete
);
router.get("/services", isUserConnected, ServiceController.getAll);

router.post("/reservation", isUserConnected, ReservationController.create);
router.get("/reservations", isUserConnected, ReservationController.getAll);
router.get(
  "/reservations/archived",
  isUserConnected,
  ReservationController.getArchived
);

router.put("/reservation/:id", isUserConnected, ReservationController.update);
router.delete(
  "/reservation/:id",
  isUserConnected,
  ReservationController.delete
);
router.get("/reservation/:id", isUserConnected, ReservationController.getById);
router.put(
  "/reservation/:id/cancel",
  isUserConnected,
  ReservationController.cancel
);

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`'${req.baseUrl}'`));
});

router.use(ErrorHandler.handle());
