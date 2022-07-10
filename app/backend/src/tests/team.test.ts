// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);
const { expect } = chai;

const teamsDB = [
  {
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
	{
		"id": 3,
		"teamName": "Botafogo"
	},
] as Team[];

describe('2 - Team', () => {
  describe('getAll method', () => { 
    before(() => {
      sinon.stub(Team, 'findAll').resolves(teamsDB as Team[]);
    });
  
    after(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });
  
    it('tests if "getAll" has status 200 and a list of all teams when succeeded', async () => {
      const response = await chai.request(app).get('/teams');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(teamsDB);
    });
  });

  describe('getById method', () => { 
    before(() => {
      sinon.stub(Team, 'findByPk').resolves(teamsDB[0] as Team);
    });
  
    after(() => {
      (Team.findByPk as sinon.SinonStub).restore();
    });
  
    it('tests if "getById" has status 200 and the team searched when succeeded', async () => {
      const response = await chai.request(app).get('/teams/1');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(teamsDB[0]);
    });
  });
});
