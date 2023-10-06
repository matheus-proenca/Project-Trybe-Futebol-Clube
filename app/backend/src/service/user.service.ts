import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../database/models/UsersModel';

type ServiceError = {
  status: number,
  data: { message: string }
};

type ServiceSucesseful<T> = {
  status: number,
  data: T
};

type ServiceStatus<T> = ServiceError | ServiceSucesseful<T>;

class UserService {
  public login = async (email:string, password:string):
  Promise<ServiceStatus<{ token:string }>> => {
    const user = await UsersModel.findOne({ where: { email } });
    if (!user) {
      return { status: 400, data: { message: 'Invalid email or password' } };
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return { status: 400, data: { message: 'Invalid email or password' } };
    }
    const token = jwt.sign({
      email: user.email,
    }, process.env.JWT_SECRET || 'pass-Word');
    return { status: 200, data: { token } };
  };
}

export default UserService;
