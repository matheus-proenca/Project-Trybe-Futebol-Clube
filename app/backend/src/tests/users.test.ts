import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {
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

  it('testando se recebe erro se não receber email e senha ', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(null)
    const resolves = await chai.request(app).post('/login').send({})

    expect(resolves.status).to.deep.eq(400)
    expect(resolves.body).to.deep.eq({ message: "All fields must be filled" })
  });
  it('testando se recebe erro se não receber email e senha invalidos', async () => {
    const response = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    })
    expect(response.status).to.be.eq(401);
    expect(response.body).not.haveOwnProperty('token');
  });
  it('testando se recebe erro se não receber email e senha ', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2OTc0ODEzNzksImV4cCI6MTY5NzQ5NTc3OX0.yNvghlJVcRP9sQ9qCfxNi3V5FU7jLMHrGVl8JGOhpN8'
    const response = await chai.request(app).get('/login/role')
      .set('Authorization', token)
    expect(response.status).to.be.eq(200);
  });
});
