import { RequestHandler } from 'express';

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
    if (password.length <= 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };
}

export default UserValidation;
