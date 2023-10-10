import { RequestHandler } from 'express';
import MatchesSevice from '../service/matches.service';

class MatchesController {
  constructor(
    private matchesService:MatchesSevice,
  ) {}

  public getMatches:RequestHandler = async (_req, res) => {
    const { status, data } = await this.matchesService.getMatches();
    res.status(status).json(data);
  };
}

export default MatchesController;
