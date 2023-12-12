import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/SequelizeUsersModel';

import mockUsers, { mockUsersInvalids } from './mocks/mockUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionada ao login', () => {
  beforeEach(function () {
    sinon.restore()
  })

  it('Rota "/login" deve retornar um token com sucesso', async function () {
    const user = UsersModel.build(mockUsers[0]);
    const { email, password } = mockUsers[0];
    sinon.stub(UsersModel, 'findOne').resolves(user);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email, password })

    expect(status).to.be.equal(200)
    expect(body).to.be.have.property('token')
  });

  it('Rota "/login" deve retornar um erro caso informacões sejão invalidas', async function () {
    const { email, password } = mockUsersInvalids[0];
    sinon.stub(UsersModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email, password })

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Rota "/login" deve informar caso nao receba a senha', async function () {
    const { email } = mockUsers[0];
    sinon.stub(UsersModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email, password: '' })

    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' })
  });

  it('Rota "/login" deve informar caso nao receba o email', async function () {
    const { password } = mockUsers[0];
    sinon.stub(UsersModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: '', password })

    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' })
  });
});
