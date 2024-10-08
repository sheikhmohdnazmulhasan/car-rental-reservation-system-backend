import { Router } from "express";
import { CarControllers } from "./car.controller";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { CarValidationSchema } from "./car.validation";

const router = Router();

router.get('/', CarControllers.getAllCars);
router.post('/', Auth('admin'), ValidationRequest(CarValidationSchema.createCarValidationSchema), CarControllers.createCar);
router.get('/:id', CarControllers.getSpecificCar);

router.put('/return', Auth('admin'), CarControllers.returnCar);

router.put('/:id', Auth('admin'), ValidationRequest(CarValidationSchema.updateCarValidationSchema),
    CarControllers.updateSpecificCar);

router.delete('/:id', Auth('admin'), CarControllers.deleteACar);

export const CarRoutes = router;