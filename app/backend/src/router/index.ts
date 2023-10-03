import * as express from 'express';
import teamRoute from './team.router';

const route = express.Router();

route.use('/teams', teamRoute);

export default route;
