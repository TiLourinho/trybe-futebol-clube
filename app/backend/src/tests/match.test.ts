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
});
