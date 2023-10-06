import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import UsersModel from '../database/models/UsersModel';
import userMocks from './mocks/user.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {

  afterEach(() => {
    sinon.restore
  })

  it('testando o role', async () => {
  })

});