import { Router } from "express";
import { CarControllers } from "./car.controller";
import Auth from "../../middlewares/auth";
import ValidationRequest from "../../middlewares/zodValidation";
import { CarValidationSchema } from "./car.validation";

const router = Router();

router.post('/', Auth('admin'), CarControllers.createCar);
router.get('/', CarControllers.getAllCars);
router.get('/:id', CarControllers.getSpecificCar);

router.put('/return', Auth('admin'), CarControllers.returnCar);

router.put('/:id', Auth('admin'), ValidationRequest(CarValidationSchema.updateCarValidationSchema),
    CarControllers.updateSpecificCar);


router.delete('/:id', Auth('admin'), CarControllers.deleteACar);

export const CarRoutes = router;