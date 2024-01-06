import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import leaderboard from './mocks/leaderboardMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionada ao leaderboard', () => {
  beforeEach(function () {
    sinon.restore();
  })

  it('Rota /home deve retornar o desenpenho dos times da casa sem considerar partidas em andamento', async function () {
    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(leaderboard)
  })
});