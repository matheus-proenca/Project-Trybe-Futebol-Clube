import MatchesModel from '../models/MatchesModel';
import TeamsModel from '../models/TeamsModel';

type Matches = {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

type ServiceError = {
  status: number,
  data: { message: string }
};

type ServiceSucesseful<T> = {
  status: number,
  data: T
};

type ServiceStatus<T> = ServiceError | ServiceSucesseful<T>;

class MatchesSevice {
  public getMatches = async ():Promise<ServiceStatus<Matches[]>> => {
    const matches = await MatchesModel.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return { status: 200, data: matches };
  };

  public getMatchesInProgress = async (progress:string): Promise<ServiceStatus<Matches[]>> => {
    if (progress === 'true') {
      const matches = await MatchesModel.findAll({
        where: { inProgress: true },
        include: [
          { association: 'homeTeam', attributes: ['teamName'] },
          { association: 'awayTeam', attributes: ['teamName'] },
        ],
      });
      return { status: 200, data: matches };
    }
    const matches = await MatchesModel.findAll({
      where: { inProgress: false },
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return { status: 200, data: matches };
  };

  public finishMatches = async (id:string): Promise<ServiceStatus<Matches>> => {
    const findMatchById = await MatchesModel.findByPk(id);
    if (!findMatchById) {
      return {
        status: 400, data: { message: 'match not found' } };
    }
    await findMatchById.update({ inProgress: false });
    return {
      status: 200, data: { message: 'Finished' } };
  };

  public resultsMatchUpdate = async (id:string, homeGoal:number, awayGoal:number)
  :Promise<ServiceStatus<Matches>> => {
    const findMatchById = await MatchesModel.findByPk(id);
    if (!findMatchById) {
      return {
        status: 400, data: { message: 'match not found' },
      };
    }
    await findMatchById.update({
      homeTeamGoals: homeGoal,
      awayTeamGoals: awayGoal,
    });
    return {
      status: 200, data: findMatchById,
    };
  };

  public createMatches =
  async (homeTeamId:number, homeTeamGoals:number, awayTeamId:number, awayTeamGoals:number)
  :Promise<ServiceStatus<Matches>> => {
    if (homeTeamId === awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const findTeams = await TeamsModel.findAll({ where: { id: [homeTeamId, awayTeamId] } });
    if (findTeams.length < 2) {
      return { status: 404, data: { message: 'There is no team with such id!' } };
    }
    const createMatch = await MatchesModel.create({
      homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });
    return { status: 201, data: createMatch };
  };
}

export default MatchesSevice;
