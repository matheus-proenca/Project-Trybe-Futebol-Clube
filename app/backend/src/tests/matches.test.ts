import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import * as jwt from 'jsonwebtoken';
import MatchesModel from '../database/models/MatchesModel';
import MatchesSevice from '../database/service/matches.service';
chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', async () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
  afterEach(() => {
    sinon.restore
  })

  const matches =
    [{
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    }
    ]
  it('testando se recebe todas a partidas ', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
    const response = await chai.request(app).get('/matches')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.an('array')
    expect(response.body).be.deep.eq(matches)
  });
  it('testando se recebe a partida pelo id ', async () => {
    sinon.stub(MatchesModel, 'findByPk').resolves(matches as any)
    const response = await chai.request(app).get('/matches')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.an('array')
  });
  it('testa se a partida não é finalizada', async () => {
    const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'token')

    expect(status).to.equal(401);
    expect(body).to.deep.equal({
      "message": "Token must be a valid token"
    });
    it('testa o leaderboard', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
      const response = await chai.request(app).get('/leaderboard/home')
      expect(response.status).to.eq(200);
    })
  });
});
