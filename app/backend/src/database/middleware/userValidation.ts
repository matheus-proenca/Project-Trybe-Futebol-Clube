import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

class UserValidation {
  static loginValidation:RequestHandler = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    const test = emailRegex.test(email);
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!test || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static tokenValidation: RequestHandler = (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pass-word');
      req.body.pass = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default UserValidation;
