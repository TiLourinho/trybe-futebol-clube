// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
import * as chai from 'chai';
import { app } from '../app';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { ILeaderboard } from '../protocols';

chai.use(chaiHttp);
const { expect } = chai;

describe('4 - Leaderboard', () => {
  describe('getAllHome method', () => {
		const leaderboardDB = [
			{
				"id": 1,
				"homeTeam": 1,
				"homeTeamGoals": 2,
				"awayTeam": 2,
				"awayTeamGoals": 1,
				"inProgress": false,
				"teamHome": {
					"teamName": "São Paulo"
				},
				"teamAway": {
					"teamName": "Grêmio"
				}
			}
		];
		
		const teamsDB = [
			{
				"id": 1,
				"teamName": "São Paulo"
			},
			{
				"id": 2,
				"teamName": "Grêmio"
			}
		];
		
		const result = [
			{
				"name": "São Paulo",
				"totalPoints": 3,
				"totalGames": 1,
				"totalVictories": 1,
				"totalDraws": 0,
				"totalLosses": 0,
				"goalsFavor": 2,
				"goalsOwn": 1,
				"goalsBalance": 1,
				"efficiency": 100
			},
			{
				"name": "Grêmio",
				"totalPoints": 0,
				"totalGames": 0,
				"totalVictories": 0,
				"totalDraws": 0,
				"totalLosses": 0,
				"goalsFavor": 0,
				"goalsOwn": 0,
				"goalsBalance": 0,
				"efficiency": null
			}
		];

    before(() => {
      sinon.stub(Match, 'findAll').resolves(leaderboardDB as unknown as Match[]);
			sinon.stub(Team, 'findAll').resolves(teamsDB as Team[]);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
			(Team.findAll as sinon.SinonStub).restore();
    });

    it('tests if "getAllHome" has status 200 and a list of all teams in Home Leaderboard when succeeded', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(result);
    });
  });

	describe('getAllAway method', () => {
		const leaderboardDB = [
			{
				"id": 1,
				"homeTeam": 1,
				"homeTeamGoals": 1,
				"awayTeam": 2,
				"awayTeamGoals": 2,
				"inProgress": false,
				"teamHome": {
					"teamName": "São Paulo"
				},
				"teamAway": {
					"teamName": "Grêmio"
				}
			}
		];
		
		const teamsDB = [
			{
				"id": 1,
				"teamName": "São Paulo"
			},
			{
				"id": 2,
				"teamName": "Grêmio"
			}
		];
		
		const result = [
			{
				"name": "Grêmio",
				"totalPoints": 3,
				"totalGames": 1,
				"totalVictories": 1,
				"totalDraws": 0,
				"totalLosses": 0,
				"goalsFavor": 2,
				"goalsOwn": 1,
				"goalsBalance": 1,
				"efficiency": 100
			},
			{
				"name": "São Paulo",
				"totalPoints": 0,
				"totalGames": 0,
				"totalVictories": 0,
				"totalDraws": 0,
				"totalLosses": 0,
				"goalsFavor": 0,
				"goalsOwn": 0,
				"goalsBalance": 0,
				"efficiency": null
			}
		];
		
    before(() => {
      sinon.stub(Match, 'findAll').resolves(leaderboardDB as unknown as Match[]);
			sinon.stub(Team, 'findAll').resolves(teamsDB as Team[]);
    });

    after(() => {
      (Match.findAll as sinon.SinonStub).restore();
			(Team.findAll as sinon.SinonStub).restore();
    });

    it('tests if "getAllAway" has status 200 and a list of all teams in Away Leaderboard when succeeded', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
  
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql(result);
    });
  });
});