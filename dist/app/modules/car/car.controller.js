"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarControllers = void 0;
const car_service_1 = require("./car.service");
function createCar(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield car_service_1.CarServices.createCarIntoDb(req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end
function getAllCars(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield car_service_1.CarServices.getAllCarsFromDb(next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
} //end;
function getSpecificCar(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield car_service_1.CarServices.getSpecificCarFromDb(req.params.id, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data,
                });
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end;
function updateSpecificCar(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield car_service_1.CarServices.updateSpecificCarIntoDb(req.params.id, req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data
                });
            }
        }
        catch (error) {
            next(error);
        }
        ;
    });
} //end
function deleteACar(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield car_service_1.CarServices.deleteACarFromDb(req.params.id, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
}
; //end
function returnCar(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield car_service_1.CarServices.returnCarDb(req.body, next);
            if (result) {
                res.status(result.statusCode).json({
                    success: result.success,
                    statusCode: result.statusCode,
                    message: result.message,
                    data: result.data
                });
            }
            ;
        }
        catch (error) {
            next(error);
        }
        ;
    });
} // end
exports.CarControllers = { createCar, getAllCars, getSpecificCar, updateSpecificCar, deleteACar, returnCar };
