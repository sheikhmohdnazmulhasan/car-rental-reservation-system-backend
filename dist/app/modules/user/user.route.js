"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const zodValidation_1 = __importDefault(require("../../middlewares/zodValidation"));
const user_validation_1 = require("./user.validation");
const checkUniqueEmail_1 = __importDefault(require("../../middlewares/checkUniqueEmail"));
const router = express_1.default.Router();
router.post('/signup', (0, zodValidation_1.default)(user_validation_1.UserValidation.createUserValidationSchema), (0, checkUniqueEmail_1.default)(), user_controller_1.UserControllers.createUser);
router.post('/signin', (0, zodValidation_1.default)(user_validation_1.UserValidation.loginUserValidationSchema), user_controller_1.UserControllers.loginUser);
exports.UserRoute = router;
