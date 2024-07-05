import { Router } from "express";
import { CarControllers } from "./car.controller";

const router = Router();

router.post('/', CarControllers.createCar);

export const CarRoutes = router;