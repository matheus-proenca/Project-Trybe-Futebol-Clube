type Matches = {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
};

class Leaderboard {
  names:string;
  ids = 0;
  totalPoint = 0;
  totalGame = 0;
  totalVictore = 0;
  totalDraw = 0;
  totalLoss = 0;
  goalFavor = 0;
  goalOwn = 0;
  match:Matches[] = [];

  constructor(id: number, name: string, matches: Matches[]) {
    this.names = name;
    this.ids = id;
    this.match = matches;
    this.totalGame = matches.length;
  }

  get homeTeam() {
    return {
      name: this.names,
      totalPoints: this.totalPoint,
      totalGames: this.totalGame,
      totalVictores: this.totalVictore,
      totalLosses: this.totalLoss,
      totalDraws: this.totalDraw,
      goalsFavor: this.goalFavor,
      goalsOwn: this.goalOwn,
    };
  }

  results(goalsFavor:number, goalsOwn:number) {
    if (goalsFavor > goalsOwn) {
      this.totalPoint += 3;
      this.totalVictore += 1;
    } else if (goalsFavor === goalsOwn) {
      this.totalLoss += 1;
    } else {
      this.totalPoint += 1;
      this.totalDraw += 1;
    }
  }

  teamPeformance() {
    this.match.forEach((e) => {
      if (e.homeTeamId === this.ids) {
        this.results(e.homeTeamGoals, e.awayTeamGoals);
        this.goalFavor += e.homeTeamGoals;
        this.goalOwn += e.awayTeamGoals;
      }
      this.results(e.awayTeamGoals, e.homeTeamGoals);
      this.goalFavor += e.homeTeamGoals;
      this.goalOwn += e.awayTeamGoals;
    });
  }
}

export default Leaderboard;
