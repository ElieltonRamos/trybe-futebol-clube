import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/SequelizeUsersModel';

import mockUsers, { mockUsersInvalids } from './mocks/usersMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas relacionada ao login', () => {
  beforeEach(function () {
    sinon.restore()
  })

  it('Rota "/login" deve retornar um token com sucesso', async function () {
    const user = UsersModel.build(mockUsers[0]);
    const { email } = mockUsers[0];
    sinon.stub(UsersModel, 'findOne').resolves(user);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email, password: 'secret_admin' })

    expect(status).to.be.equal(200)
    expect(body).to.be.have.property('token')
  });

  it('Rota "/login" deve retornar um erro caso informacões sejão invalidas', async function () {
    const { email } = mockUsersInvalids[0];
    sinon.stub(UsersModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email, password: 'secret_admin' })

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
    sinon.stub(UsersModel, 'findOne').resolves(null);

    const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: '', password: 'secret_admin' })

    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' })
  });

  it('Rota "/login/role" deve retornar a role do user', async function () {
    const user = UsersModel.build(mockUsers[0]);
    const { email, role } = mockUsers[0];
    sinon.stub(UsersModel, 'findOne').resolves(user);

    const { body } = await chai.request(app)
      .post('/login')
      .send({ email, password: 'secret_admin' });

    const requestRole = await chai.request(app)
      .get('/login/role')
      .set({ authorization: `Bearer ${body.token}` });

    expect(requestRole.status).to.be.equal(200);
    expect(requestRole.body).to.be.deep.equal({ role })
  });
});
