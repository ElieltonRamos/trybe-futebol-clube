import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/SequelizeTeamsModel';

import { Response } from 'superagent';
import mockTeams from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionada aos times', () => {
  beforeEach(function () {
    sinon.restore()
  })
  it('Rota "/teams" deve retornar os dados corretamente', async function () {
    const teams = TeamsModel.bulkBuild(mockTeams);
    sinon.stub(TeamsModel, 'findAll').resolves(teams);

    const { status, body } = await chai.request(app).get('/teams')

    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal(mockTeams)
  });
});
