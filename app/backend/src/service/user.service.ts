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
  static login = async (emails:string, password:string):
  Promise<ServiceStatus<{ token:string }>> => {
    const user = await UsersModel.findOne({ where: { email: emails } });
    if (!user) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }
    const { email, username, role } = user.toJSON();
    const token = jwt.sign(
      {
        email, username, role,
      },
      process.env.JWT_SECRET || 'pass-word',
      { algorithm: 'HS256', expiresIn: '4h' },
    );
    return { status: 200, data: { token } };
  };
}

export default UserService;
