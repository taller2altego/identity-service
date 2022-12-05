// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const rewire = require('rewire');
const sandbox = require('sinon');

// Repositories
const SessionRepository = require('../../src/repository/SessionRepository');

// services
const SessionService = rewire('../../src/service/SessionService');

describe("SessionService Unit Tests", () => {

  let sessionRepositoryMock;
  let jwtMock;
  let nodeMailerMock;

  before(() => {
    SessionService.__set__('jwt', {
      sign: () => { },
      verify: () => { },
      decode: () => { }
    });

    SessionService.__set__('nodeMailer', {
      sendMail: () => { }
    });
  });

  beforeEach(() => {
    sessionRepositoryMock = sandbox.mock(SessionRepository);
    jwtMock = sandbox.mock(SessionService.__get__('jwt'));
    nodeMailerMock = sandbox.mock(SessionService.__get__('nodeMailer'));
  });

  afterEach(sandbox.restore);

  describe("login", () => {

    it("Should call login as expected", async () => {
      sessionRepositoryMock
        .expects('set')
        .once()
        .withArgs('email', 'token')
        .resolves(true);

      jwtMock
        .expects('sign')
        .once()
        .withArgs({ email: 'email' }, 'pepe', { expiresIn: 3600 * 2 })
        .returns('token');

      const response = await SessionService.login({ email: 'email' });
      expect(response).to.equal('token');
    });
  });

  describe("logout", () => {

    it("Should works logout as expected", async () => {
      sessionRepositoryMock
        .expects('delete')
        .once()
        .withArgs('email')
        .resolves(true);

      jwtMock
        .expects('verify')
        .once()
        .withArgs('token', 'pepe')
        .returns(true);

      jwtMock
        .expects('decode')
        .once()
        .withArgs('token', { complete: true })
        .returns({ payload: { email: 'email' } });

      const response = await SessionService.logout('token');
      expect(response).to.be.deep.equal(undefined);
    });

    it("Should fails logout as expected", async () => {
      sessionRepositoryMock.expects('delete').never();
      jwtMock.expects('decode').never();

      jwtMock
        .expects('verify')
        .once()
        .withArgs('token', 'pepe')
        .returns(false);

      await SessionService
        .logout('token')
        .then(() => { throw new Error(); })
        .catch(err => {
          expect(err.message).to.be.equal('El token no existe');
        });

      sandbox.verify();
    });
  });

  describe("block", () => {

    it("Should works block as expected", async () => {
      sessionRepositoryMock
        .expects('delete')
        .once()
        .withArgs('email')
        .resolves(true);

      const response = await SessionService.block('email');
      expect(response).to.be.deep.equal(undefined);
      sandbox.verify();
    });
  });

  describe("sendToken", () => {

    it("Should works sendToken as expected", async () => {
      sessionRepositoryMock
        .expects('set')
        .once()
        .withArgs('email', 'token')
        .resolves(true);

      jwtMock
        .expects('sign')
        .once()
        .withArgs({ email: 'email' }, 'pepe', { expiresIn: 300 })
        .returns('token');

      nodeMailerMock
        .expects('sendMail')
        .once()
        .withArgs('email', 'token')
        .returns(undefined);

      const response = await SessionService.sendToken({ email: 'email' });
      expect(response).to.be.equal('token');
      sandbox.verify();
    });

  });

  describe("tokenIsValid", () => {

    it("Should works tokenIsValid as expected", async () => {
      jwtMock
        .expects('verify')
        .once()
        .withArgs('token', 'pepe')
        .returns(true);

      jwtMock
        .expects('decode')
        .once()
        .withArgs('token', { complete: true })
        .returns({
          payload: {
            email: 'email',
            isAdmin: true,
            id: 1,
            isSuperadmin: false
          }
        });

      sessionRepositoryMock
        .expects('validate')
        .once()
        .withArgs('email')
        .resolves(true);

      const response = await SessionService.tokenIsValid('token');
      expect(response).to.be.deep.equal({
        token: 'token',
        isAdmin: true,
        id: 1,
        isSuperadmin: false
      });
    });

    it("Should fails tokenIsValid as expected when jwt is not valid", async () => {
      sessionRepositoryMock.expects('validate').never();
      jwtMock.expects('decode').never();

      jwtMock
        .expects('verify')
        .once()
        .withArgs('token', 'pepe')
        .returns(false);

      await SessionService
        .tokenIsValid('token')
        .then(() => { throw new Error(); })
        .catch(err => {
          expect(err.message).to.be.equal('El token no es valido');
        });

      sandbox.verify();
    });

    it("Should fails tokenIsValid as expected when the email does not exist", async () => {
      jwtMock
        .expects('verify')
        .once()
        .withArgs('token', 'pepe')
        .returns(true);

      jwtMock
        .expects('decode')
        .once()
        .withArgs('token', { complete: true })
        .returns({
          payload: {
            email: 'email',
            isAdmin: true,
            id: 1,
            isSuperadmin: false
          }
        });

      sessionRepositoryMock
        .expects('validate')
        .once()
        .withArgs('email')
        .resolves(false);

      await SessionService
        .tokenIsValid('token')
        .then(() => { throw new Error(); })
        .catch(err => {
          expect(err.message).to.be.equal('El token no es valido');
        });

      sandbox.verify();
    });
  });
});
