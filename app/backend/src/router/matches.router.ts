import * as express from 'express';
import MatchesController from '../controller/matches.controller';
import MatchesSevice from '../service/matches.service';
import UserValidation from '../middleware/userValidation';

const matchetservice = new MatchesSevice();
const matchescontroller = new MatchesController(matchetservice);

const matchesRoute = express.Router();

matchesRoute.get('/', matchescontroller.getMatches);
matchesRoute.patch('/:id/finish', UserValidation.tokenValidation, matchescontroller.finishMatches);
matchesRoute.patch('/:id', UserValidation.tokenValidation, matchescontroller.updateMatch);
matchesRoute.post('/', UserValidation.tokenValidation, matchescontroller.createMatch);

export default matchesRoute;
