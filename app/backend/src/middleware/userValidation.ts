import { RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

class UserValidation {
  static loginValidation:RequestHandler = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const test = emailRegex.test(email);
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!test) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static tokenValidation: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if (!decoded) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      req.body = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default UserValidation;
