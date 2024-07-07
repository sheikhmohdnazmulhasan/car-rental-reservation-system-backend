"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRoutes = void 0;
const express_1 = require("express");
const car_controller_1 = require("./car.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const zodValidation_1 = __importDefault(require("../../middlewares/zodValidation"));
const car_validation_1 = require("./car.validation");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)('admin'), (0, zodValidation_1.default)(car_validation_1.CarValidationSchema.createCarValidationSchema), car_controller_1.CarControllers.createCar);
router.get('/', car_controller_1.CarControllers.getAllCars);
router.get('/:id', car_controller_1.CarControllers.getSpecificCar);
router.put('/return', (0, auth_1.default)('admin'), car_controller_1.CarControllers.returnCar);
router.put('/:id', (0, auth_1.default)('admin'), (0, zodValidation_1.default)(car_validation_1.CarValidationSchema.updateCarValidationSchema), car_controller_1.CarControllers.updateSpecificCar);
router.delete('/:id', (0, auth_1.default)('admin'), car_controller_1.CarControllers.deleteACar);
exports.CarRoutes = router;
