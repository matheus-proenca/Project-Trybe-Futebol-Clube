import { RequestHandler } from 'express';
import UserService from '../service/user.service';

class UserController {
  public login:RequestHandler = async (req, res): Promise<void> => {
    const { email, password } = req.body;
    const { status, data } = await UserService.login(email, password);
    res.status(status).json(data);
  };

  public getRole:RequestHandler = async (req, res) => {
    const { role } = req.body;
    res.status(200).json(role);
  };
}

export default UserController;
