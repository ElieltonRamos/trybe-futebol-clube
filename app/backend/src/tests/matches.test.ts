import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/SequelizeMatchesModel';

import matchesMock from './mocks/matchesMock';
import { token } from './mocks/usersMock';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionadas a matches', function () {

  beforeEach(function () { sinon.restore() })

  it('"/matches" deve retornar todas as partidas sem filtro', async function () {
    const allMatches = matchesModel.bulkBuild(matchesMock, {
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam' },
        { model: SequelizeTeamsModel, as: 'awayTeam' }
      ]
    });
    sinon.stub(matchesModel, 'findAll').resolves(allMatches);

    const { status, body } = await chai.request(app)
      .get('/matches');

    expect(body).to.deep.equal(matchesMock);
    expect(status).to.be.equal(200);
  })

  it('"/matches" deve retornar as partidas com filtro', async function () {
    const allMatches = matchesModel.bulkBuild(matchesMock, {
      include: [
        { model: SequelizeTeamsModel, as: 'homeTeam' },
        { model: SequelizeTeamsModel, as: 'awayTeam' }
      ]
    });
    sinon.stub(matchesModel, 'findAll').resolves(allMatches);

    const { status, body } = await chai.request(app)
      .get('/matches?inProgress=true');

    expect(body).to.deep.equal([matchesMock[1]]);
    expect(status).to.be.equal(200);
  })

  it('"/matches/:id/finish" deve finalizar uma partida com sucesso', async function () {
    const match = matchesModel.build(matchesMock[1])
    sinon.stub(matchesModel, 'findByPk').resolves(match);
    sinon.stub(matchesModel, 'update').resolves([1])

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set({ authorization: token });

    expect(body).to.deep.equal({ message: 'Finished' });
    expect(status).to.be.equal(200);
  })
})