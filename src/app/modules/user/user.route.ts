import express from 'express';
import { UserControllers } from './user.controller';
import ValidationRequest from '../../middlewares/zodValidation';
import { UserValidation } from './user.validation';
import CheckUniqueEmail from '../../middlewares/checkUniqueEmail';
import Auth from '../../middlewares/auth';

const router = express.Router();

router.post('/signup', ValidationRequest(UserValidation.createUserValidationSchema), CheckUniqueEmail(), UserControllers.createUser);

router.post('/signin', ValidationRequest(UserValidation.loginUserValidationSchema), UserControllers.loginUser);

router.patch('/user/update', ValidationRequest(UserValidation.updateUserValidationSchema), UserControllers.updateSpecificUser)

router.get('/user', UserControllers.getFullUserObj);
router.get('/user/recovery', UserControllers.getUserForRecoverAccount);
router.get('/users', Auth('admin'), UserControllers.getRoleBaseUser);
router.patch('/user/update-role', Auth('admin'), UserControllers.changeUserRole)

export const UserRoute = router;