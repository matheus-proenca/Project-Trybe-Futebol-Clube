import { RequestHandler } from 'express';
import UserService from '../service/user.service';

class UserController {
  constructor(
    private userService:UserService,
  ) {}

  public login:RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login(email, password);
    res.status(status).json(data);
  };
}

export default UserController;
