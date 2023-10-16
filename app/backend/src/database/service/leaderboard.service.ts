import MatchesModel from '../models/MatchesModel';
import Leaderboard from '../Interfaces/Leaderboard';
import TeamsModel from '../models/TeamsModel';

type teamHome = {
  id:number
  teamName:string
  teamHome:[{
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
    inProgress: boolean,
  }]
};

class LeaderboardSevice {
  public results = async (teamMatch:teamHome[]) => {
    const finalResult = teamMatch.map((e) => {
      const teamsHome = new Leaderboard(e.id, e.teamName, e.teamHome);
      teamsHome.teamPeformance();
      teamsHome.goalsTotal();
      teamsHome.efficiencyTotal();
      return teamsHome.homeTeam;
    });
    return finalResult.sort();
  };

  public getResultsTeamHome = async () => {
    const match = await TeamsModel.findAll({
      include: [
        {
          where: { inProgress: false },
          model: MatchesModel,
          as: 'teamHome',
        },
      ],
    });
    return { status: 200, data: this.results(match.map((e) => e.toJSON())) };
  };
}

export default LeaderboardSevice;
