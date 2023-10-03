import * as express from 'express';
import TeamController from '../controller/teams.controller';
import ServiceTeams from '../service/teams.service';

const teamService = new ServiceTeams();
const teamController = new TeamController(teamService);

const teamRoute = express.Router();
teamRoute.get('/', teamController.getTeams);

export default teamRoute;
