import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';
import LeaderboardSevice from '../service/leaderboard.service';

const leaderboardService = new LeaderboardSevice();
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRoute = express.Router();

leaderboardRoute.get('/home', leaderboardController.getLeaderboard);

export default leaderboardRoute;
