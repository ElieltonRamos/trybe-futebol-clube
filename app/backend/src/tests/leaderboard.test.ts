import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import leaderboard from './mocks/leaderboardMock';
import matchesModel from '../database/models/SequelizeMatchesModel';
import matchesMock from './mocks/matchesMock';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import TeamsModel from '../database/models/SequelizeTeamsModel';
import mockTeams from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionada ao leaderboard', () => {
  beforeEach(function () {
    sinon.restore();
  })

  it('Rota /home deve retornar o desenpenho dos times da casa sem considerar partidas em andamento', async function () {
    const allMatches = matchesModel.bulkBuild(matchesMock, {
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam' },
        { model: SequelizeTeamsModel, as: 'awayTeam' }
      ]
    });
    sinon.stub(TeamsModel, 'findAll').resolves(TeamsModel.bulkBuild(mockTeams));
    sinon.stub(matchesModel, 'findAll').resolves(allMatches);
    
    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboard)
  })
});