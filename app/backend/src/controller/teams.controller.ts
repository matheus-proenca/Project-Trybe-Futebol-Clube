import { RequestHandler } from 'express';
import ServiceTeams from '../service/teams.service';

class TeamController {
  constructor(
    private ServiceTeam:ServiceTeams,
  ) {}

  getTeams:RequestHandler = async (_req, res) => {
    const { status, data } = await this.ServiceTeam.getAllTeams();

    res.status(status).json(data);
  };

  getTeamsById:RequestHandler = async (req, res) => {
    const { id } = req.params;

    const { status, data } = await this.ServiceTeam.getTeamById(id);

    res.status(status).json(data);
  };
}

export default TeamController;
