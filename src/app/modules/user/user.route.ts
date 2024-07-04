import express from 'express';
import { UserControllers } from './user.controller';
import ValidationRequest from '../../middlewares/zodValidation';
import { UserValidation } from './user.validation';
import CheckUniqueEmail from '../../middlewares/checkUniqueEmail';

const router = express.Router();

router.post('/signup', ValidationRequest(UserValidation.createUserValidationSchema), CheckUniqueEmail(), UserControllers.createUser);

router.post('/signin')

export const UserRoute = router;