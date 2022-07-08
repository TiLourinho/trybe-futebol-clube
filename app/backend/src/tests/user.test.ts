// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/User';

chai.use(chaiHttp);
const { expect } = chai;

describe('1 - User', () => {
  const userDB = {
    id: 1,
    email: 'user@user.com',
    role: 'user',
    username: 'User',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  } as User;
  
  const body = { 
    email: 'user@user.com',
    password: 'secret_user'
  };

  before(() => {
    sinon.stub(User, 'findOne').resolves(userDB);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('tests if findOne method has status 200 when succeeded', async () => {
    const response = await chai.request(app).post('/login').send(body);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.a.key('token');
  });
});
