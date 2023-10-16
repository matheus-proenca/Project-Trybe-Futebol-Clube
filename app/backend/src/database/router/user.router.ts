import * as express from 'express';
import UserController from '../controller/user.controller';
import UserValidation from '../middleware/userValidation';

const userController = new UserController();

const userRoute = express.Router();
userRoute.post('/', UserValidation.loginValidation, userController.login);
userRoute.get('/role', UserValidation.tokenValidation, userController.getRole);

export default userRoute;
