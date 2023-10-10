import * as express from 'express';
import teamRoute from './team.router';
import userRoute from './user.router';
import matchesRoute from './matches.router';

const route = express.Router();

route.use('/teams', teamRoute);
route.use('/login', userRoute);
route.use('/matches', matchesRoute);

export default route;
