import { RequestHandler } from 'express';

class UserValidation {
  static loginValidation:RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const test = emailRegex.test(email);
    if (!email || typeof email !== 'string') {
      res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!password || typeof password !== 'string') {
      res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!test) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
    if (password.length <= 6) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };
}

export default UserValidation;
