import * as express from 'express';
import UserService from '../service/user.service';
import UserController from '../controller/user.controller';
import UserValidation from '../middleware/userValidation';

const userService = new UserService();
const userController = new UserController(userService);

const userRoute = express.Router();
userRoute.post('/', UserValidation.loginValidation, userController.login);
userRoute.get('/role', UserValidation.tokenValidation, userController.getRole);

export default userRoute;
