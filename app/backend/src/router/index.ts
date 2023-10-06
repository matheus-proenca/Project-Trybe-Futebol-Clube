import * as express from 'express';
import teamRoute from './team.router';
import userRoute from './user.router';

const route = express.Router();

route.use('/teams', teamRoute);
route.use('/login', userRoute);

export default route;
