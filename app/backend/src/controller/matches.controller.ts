import { RequestHandler } from 'express';
import MatchesSevice from '../service/matches.service';

class MatchesController {
  constructor(
    private matchesService:MatchesSevice,
  ) {}

  public getMatches:RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, data } = await this.matchesService.getMatches();
      return res.status(status).json(data);
    }
    const { status, data } = await this.matchesService
      .getMatchesInProgress(inProgress.toString());
    res.status(status).json(data);
  };
}

export default MatchesController;
