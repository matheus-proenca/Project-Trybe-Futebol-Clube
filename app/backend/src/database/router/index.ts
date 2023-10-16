import * as express from 'express';
import teamRoute from './team.router';
import userRoute from './user.router';
import matchesRoute from './matches.router';
import leaderboardRoute from './leaderboard.route';

const route = express.Router();

route.use('/teams', teamRoute);
route.use('/login', userRoute);
route.use('/matches', matchesRoute);
route.use('/leaderboard', leaderboardRoute);

export default route;
