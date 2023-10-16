import MatchesModel from '../models/MatchesModel';
import Leaderboard from '../Interfaces/Leaderboard';
import TeamsModel from '../models/TeamsModel';

type teamHome = {
  id:number
  teamName:string
  teamHome:[{
    id: number;
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
      console.log(e.teamHome);
      const teamsHome = new Leaderboard(e.id, e.teamName, e.teamHome);
      teamsHome.teamPeformance();
      teamsHome.goalsTotal();
      teamsHome.efficiencyTotal();

      return teamsHome.homeTeam;
    });
    return { results: finalResult };
  };

  public getResultsTeamHome = async () => {
    const match = await TeamsModel.findAll({
      include: [
        {
          model: MatchesModel,
          as: 'teamHome',
          where: { inProgress: false },
        },
      ],
    });
    const matchResult = await this.results(match.map((e) => e.toJSON()));
    const desempate = matchResult.results.sort((a, b) => b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
    return { status: 200, data: desempate };
  };
}

export default LeaderboardSevice;
