import express from 'express';
import { UserControllers } from './user.controller';
import ValidationRequest from '../../middlewares/zodValidation';
import { UserValidation } from './user.validation';
import CheckUniqueEmail from '../../middlewares/checkUniqueEmail';

const router = express.Router();

router.post('/signup', ValidationRequest(UserValidation.createUserValidationSchema), CheckUniqueEmail(), UserControllers.createUser);

router.post('/signin', ValidationRequest(UserValidation.loginUserValidationSchema), UserControllers.loginUser);

router.patch('/user/update', ValidationRequest(UserValidation.updateUserValidationSchema), UserControllers.updateSpecificUser)

router.get('/user', UserControllers.getFullUserObj);


export const UserRoute = router;