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

  public finishMatches:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await this.matchesService.finishMatches(id);
    res.status(status).json(data);
  };

  public updateMatches:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService
      .resultsMatchUpdate(id, homeTeamGoals, awayTeamGoals);
    res.status(status).json(data);
  };

  public createMatch:RequestHandler = async (req, res) => {
    const { homeTeamId, awayTeamId,
      homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService
      .createMatches(homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals);
    res.status(status).json(data);
  };
}

export default MatchesController;
