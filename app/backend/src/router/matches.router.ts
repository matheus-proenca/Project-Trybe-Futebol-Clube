import * as express from 'express';
import MatchesController from '../controller/matches.controller';
import MatchesSevice from '../service/matches.service';

const matchetservice = new MatchesSevice();
const matchescontroller = new MatchesController(matchetservice);

const matchesRoute = express.Router();

matchesRoute.get('/', matchescontroller.getMatches);

export default matchesRoute;
