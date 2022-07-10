// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);
const { expect } = chai;

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

describe('1 - User', () => {
  describe('login method', () => {
    before(() => {
      sinon.stub(User, 'findOne').resolves(userDB);
    });
  
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });
  
    it('tests if "login" has status 200 and "token" as key when succeeded', async () => {
      const response = await chai.request(app).post('/login').send(body);
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.a.key('token');
    });
  });

  describe('validate method', () => { 
    before(() => {
      sinon.stub(User, 'findByPk').resolves(userDB);
    });
  
    after(() => {
      (User.findByPk as sinon.SinonStub).restore();
    });
  
    it('tests if "login" has status 200 and "role" as key when succeeded', async () => {
      const response = await chai.request(app).get('/login/validate')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTc0NzU5NTB9.CtUPSJJvxw-w_KCncuuMcw9kqnYz-ESIGSBhI26_RKg');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.a.key('role');
    });
  });
});
