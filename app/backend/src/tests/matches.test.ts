import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesModel from '../database/models/SequelizeMatchesModel';

import matchesMock from './mocks/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionadas a matches', function () {

  beforeEach(function () { sinon.restore() })

  it('"/matches" deve retornar todas as partidas sem filtro', async function () {
    const allMatches = matchesModel.bulkBuild(matchesMock);
    sinon.stub(matchesModel, 'findAll').resolves(allMatches);

    const { status, body } = await chai.request(app)
      .get('/matches')
      .end();

    expect(body).to.been.deep.equal(matchesMock);
    expect(status).to.be.equal(200);
  })
})