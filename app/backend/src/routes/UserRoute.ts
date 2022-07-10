import { Router } from 'express';
import { UserFactory } from '../utils/factory';
import validateLogin from '../middlewares/loginValidation';

const userRouter: Router = Router();

userRouter.post('/', validateLogin, (req, res, next) => {
  UserFactory().login(req, res, next);
});

userRouter.get('/validate', (req, res, next) => {
  UserFactory().validate(req, res, next);
});

export default userRouter;
