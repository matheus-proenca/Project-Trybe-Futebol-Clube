import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
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

  it('testando se recebe todos os times ', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(TeamsModel.bulkBuild([{
      id: 1,
      teamName: "Vasco"
    }]))
    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.an('array')
  });
  it('testando se recebe o time pelo id', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(TeamsModel.build({
      id: 1,
      teamName: "Vasco"
    }))
    const response = await chai.request(app).get('/teams/1')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.an('object')
  })
  it('testa se não encontra o time com um id inexistente', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(TeamsModel.build({
      id: 1,
      teamName: "Vasco"
    }))
    const response = await chai.request(app).get('/teams/67')
    const message = 'Team not found'

    expect(response.status).to.be.equal(404)
    expect(response.body).to.be.deep.equal(message)
  })
});
