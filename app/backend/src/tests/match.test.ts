// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Match from '../database/models/Match';

chai.use(chaiHttp);
const { expect } = chai;

const matchesDB = [
  {
		"id": 1,
		"homeTeam": 16,
		"homeTeamGoals": 1,
		"awayTeam": 8,
		"awayTeamGoals": 1,
		"inProgress": 0,
	},
	{
		"id": 2,
		"homeTeam": 9,
		"homeTeamGoals": 1,
		"awayTeam": 14,
		"awayTeamGoals": 1,
		"inProgress": 0,
	},
	{
		"id": 3,
		"homeTeam": 4,
		"homeTeamGoals": 3,
		"awayTeam": 11,
		"awayTeamGoals": 0,
		"inProgress": 0,
	},
] as Match[];

const body = {
	"homeTeam": 16,
	"awayTeam": 12,
	"homeTeamGoals": 4,
	"awayTeamGoals": 2
};

describe('3 - Match', () => {
  describe('getAll method', () => { 
    before(() => {
      sinon.stub(Match, 'findAll').resolves(matchesDB as Match[]);
    });
  
    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('tests if "getAll" has status 200 and a list of all matches when succeeded', async () => {
      const response = await chai.request(app).get('/matches');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(matchesDB);
    });
  });

	describe('create method', () => { 
    before(() => {
      sinon.stub(Match, 'create').resolves(body as Match);
    });
  
    after(() => {
      (Match.create as sinon.SinonStub).restore();
    });
  
    it('tests if "create" has status 201 and the created match when succeeded', async () => {
      const response = await chai.request(app).post('/matches')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2NTc0NzU5NTB9.CtUPSJJvxw-w_KCncuuMcw9kqnYz-ESIGSBhI26_RKg')
      .send(body);
  
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.eql(body);
    });
  });

	describe('updateProgress method', () => {
		const result = {
			"message": "Finished",
		}

    before(() => {
      sinon.stub(Match, 'update').resolves();
    });
  
    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });
  
    it('tests if "updateProgress" has status 200 and an object when succeeded', async () => {
      const response = await chai.request(app).patch('/matches/41/finish');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(result);
    });
  });

  describe('updateResult method', () => {
		const result = {
			"message": "Updated",
		}

    before(() => {
      sinon.stub(Match, 'update').resolves();
    });
  
    after(() => {
      (Match.update as sinon.SinonStub).restore();
    });
  
    it('tests if "updateResult" has status 200 and an object when succeeded', async () => {
      const response = await chai.request(app).patch('/matches/41');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(result);
    });
  });
});
