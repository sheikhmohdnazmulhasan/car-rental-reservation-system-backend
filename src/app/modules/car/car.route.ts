import { Router } from "express";
import { CarControllers } from "./car.controller";
import Auth from "../../middlewares/auth";

const router = Router();

router.post('/', Auth('admin'), CarControllers.createCar);

export const CarRoutes = router;