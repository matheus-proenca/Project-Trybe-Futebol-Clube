import MatchesModel from '../database/models/MatchesModel';

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
}

export default MatchesSevice;