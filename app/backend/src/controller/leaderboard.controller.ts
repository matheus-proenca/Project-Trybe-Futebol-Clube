import { RequestHandler } from 'express';
import LeaderboardSevice from '../service/leaderboard.service';

class LeaderboardController {
  constructor(
    private leaderboardService:LeaderboardSevice,
  ) {}

  public getLeaderboard:RequestHandler = async (_req, res) => {
    const { status, data } = await this.leaderboardService.getResultsTeamHome();
    res.status(status).json(data);
  };
}

export default LeaderboardController;
