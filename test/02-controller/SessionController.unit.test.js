// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// controller
const SessionController = require('../../src/controller/SessionController');

// Service
const SessionService = require('../../src/service/SessionService');

describe('SessionController Test Suite', () => {

  let sessionServiceMock;
  let mockNext;

  let objTest;

  beforeEach(() => {
    objTest = { send: (args) => { return args; } };
    sessionServiceMock = sandbox.mock(SessionService);
    mockNext = sandbox.spy();
  });

  afterEach(sandbox.restore);

  describe("login", () => {
    it('Should call login service as expected', async () => {
      sessionServiceMock
        .expects('login')
        .once()
        .withArgs({ email: 'email' })
        .resolves('token');

      const req = { body: { email: 'email' } };
      await SessionController.login(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200, token: 'token' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });
  });

  describe("sendToken", () => {
    it('Should call sendToken service as expected', async () => {
      sessionServiceMock
        .expects('sendToken')
        .once()
        .withArgs({ email: 'email' })
        .resolves('token');

      const req = { body: { email: 'email' } };
      await SessionController.sendToken(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200, token: 'token' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });
  });

  describe("logout", () => {
    it('Should call logout service as expected', async () => {
      sessionServiceMock
        .expects('logout')
        .once()
        .withArgs('123')
        .resolves(undefined);

      const req = { headers: { authorization: 'Bearer 123' } };
      await SessionController.logout(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200 });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should call logout service as expected when the token is not bearer', async () => {
      sessionServiceMock
        .expects('logout')
        .once()
        .withArgs('')
        .resolves(undefined);

      const req = { headers: { authorization: '123' } };
      await SessionController.logout(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200 });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should fail logout service as expected', async () => {
      sessionServiceMock
        .expects('logout')
        .once()
        .withArgs('')
        .rejects({ statusCode: 400, message: '' });

      const req = { headers: { authorization: '123' } };
      await SessionController.logout(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 400, message: '' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should fail logout service as expected when the error is unexpected', async () => {
      sessionServiceMock
        .expects('logout')
        .once()
        .withArgs('')
        .rejects();

      const req = { headers: { authorization: '123' } };
      await SessionController.logout(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 500, message: 'Unexpected error' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });
  });

  describe("authentication", () => {
    it('Should call authentication service as expected', async () => {
      sessionServiceMock
        .expects('tokenIsValid')
        .once()
        .withArgs('123')
        .resolves({ token: 'token' });

      const req = { headers: { authorization: 'Bearer 123' } };
      await SessionController.authentication(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200, token: 'token' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should call authentication service as expected when the token is not bearer', async () => {
      sessionServiceMock
        .expects('tokenIsValid')
        .once()
        .withArgs('')
        .resolves({ token: 'token' });

      const req = { headers: { authorization: '123' } };
      await SessionController.authentication(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200, token: 'token' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should fail authentication service as expected', async () => {
      sessionServiceMock
        .expects('tokenIsValid')
        .once()
        .withArgs('')
        .rejects({ message: 'asd' });

      const req = { headers: { authorization: '123' } };
      await SessionController.authentication(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 401, message: 'asd' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });
  });

  describe("block", () => {
    it('Should call block service as expected', async () => {
      sessionServiceMock
        .expects('block')
        .once()
        .withArgs('email')
        .resolves({ token: 'token' });

      const req = { body: { email: 'email' } };
      await SessionController.block(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200 });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should call block service as expected when the token is not bearer', async () => {
      sessionServiceMock
        .expects('block')
        .once()
        .withArgs('email')
        .resolves({ token: 'token' });

      const req = { body: { email: 'email' } };
      await SessionController.block(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 200 });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should fail block service as expected', async () => {
      sessionServiceMock
        .expects('block')
        .once()
        .withArgs('email')
        .rejects({ statusCode: 401, message: 'asd' });

      const req = { body: { email: 'email' } };
      await SessionController.block(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 401, message: 'asd' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });

    it('Should fail block service as expected when the error is unexpected', async () => {
      sessionServiceMock
        .expects('block')
        .once()
        .withArgs('email')
        .rejects();

      const req = { body: { email: 'email' } };
      await SessionController.block(req, objTest, mockNext);
      expect(objTest.customResponse).to.deep.equal({ statusCode: 500, message: 'Unexpected error' });
      expect(mockNext.calledOnce).to.equal(true);
      sandbox.verify();
    });
  });

  // afterEach(sandbox.restore);

  // describe('findTravels', () => {
  //   let mockTravel;
  //   let mockNext;

  //   let objTest;

  //   beforeEach(() => {
  //     objTest = { send: (args) => { return args; } };
  //     mockTravel = sandbox.mock(TravelService);
  //     mockNext = sandbox.spy();
  //   });

  //   afterEach(() => sandbox.restore());

  //   it('Should find travels as expected', async () => {
  //     mockTravel
  //       .expects('findTravels')
  //       .once()
  //       .withArgs([1, 2])
  //       .resolves({ id: 1 });

  //     const req = { query: { latitude: 1, longitude: 2 } };
  //     await TravelController.findTravels(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ statusCode: 200, data: { id: 1 } });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });

  //   it('Should fail', async () => {
  //     mockTravel
  //       .expects('findTravels')
  //       .once()
  //       .withArgs([1, 2])
  //       .rejects();

  //     const req = { query: { latitude: 1, longitude: 2 } };
  //     await TravelController.findTravels(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ message: "Unexpected Error", statusCode: 500 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });
  // });

  // describe('findTravel', () => {
  //   let mockTravel;
  //   let mockNext;

  //   let objTest;

  //   beforeEach(() => {
  //     objTest = { send: (args) => { return args; } };
  //     mockTravel = sandbox.mock(TravelService);
  //     mockNext = sandbox.spy();
  //   });

  //   afterEach(() => sandbox.restore());

  //   it('Should find travel as expected', async () => {
  //     mockTravel
  //       .expects('findTravel')
  //       .once()
  //       .withArgs(1)
  //       .resolves({ id: 1 });

  //     const req = { params: { travelId: 1 } };
  //     await TravelController.findTravel(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ statusCode: 200, data: { id: 1 } });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });

  //   it('Should fail', async () => {
  //     mockTravel
  //       .expects('findTravel')
  //       .once()
  //       .withArgs(1)
  //       .rejects();

  //     const req = { params: { travelId: 1 } };
  //     await TravelController.findTravel(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ message: "Unexpected Error", statusCode: 500 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });
  // });

  // describe('findTravelsByUserId', () => {
  //   let mockTravel;
  //   let mockNext;

  //   let objTest;

  //   beforeEach(() => {
  //     objTest = { send: (args) => { return args; } };
  //     mockTravel = sandbox.mock(TravelService);
  //     mockNext = sandbox.spy();
  //   });

  //   afterEach(() => sandbox.restore());

  //   it('Should find travels by user id as expected', async () => {
  //     mockTravel
  //       .expects('findTravelsByUserId')
  //       .once()
  //       .withArgs(1, { page: 1, limit: 10 })
  //       .resolves({ data: [], total: 0, page: 1, limit: 10 });

  //     const req = { params: { userId: 1 }, query: { page: 1, limit: 10 } };
  //     await TravelController.findTravelsByUserId(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ statusCode: 200, data: [], total: 0, page: 1, limit: 10 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });

  //   it('Should fail', async () => {
  //     mockTravel
  //       .expects('findTravelsByUserId')
  //       .once()
  //       .withArgs(1, { page: 1, limit: 10 })
  //       .rejects();

  //     const req = { params: { userId: 1 }, query: { page: 1, limit: 10 } };
  //     await TravelController.findTravelsByUserId(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ message: "Unexpected Error", statusCode: 500 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });
  // });

  // describe('createTravel', () => {
  //   let mockTravel;
  //   let mockNext;

  //   let objTest;

  //   beforeEach(() => {
  //     objTest = { send: (args) => { return args; } };
  //     mockTravel = sandbox.mock(TravelService);
  //     mockNext = sandbox.spy();
  //   });

  //   afterEach(() => sandbox.restore());

  //   it('Should create travel as expected', async () => {
  //     mockTravel
  //       .expects('createTravel')
  //       .once()
  //       .withArgs({ x: 1, y: 2 })
  //       .resolves({ result: true });

  //     const req = { body: { x: 1, y: 2 } };
  //     await TravelController.createTravel(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ statusCode: 200, data: { result: true } });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });

  //   it('Should fail', async () => {
  //     mockTravel
  //       .expects('createTravel')
  //       .once()
  //       .withArgs({ x: 1, y: 2 })
  //       .rejects();

  //     const req = { body: { x: 1, y: 2 } };
  //     await TravelController.createTravel(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ message: "Unexpected Error", statusCode: 500 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });
  // });

  // describe('patchTravel', () => {
  //   let mockTravel;
  //   let mockNext;

  //   let objTest;

  //   beforeEach(() => {
  //     objTest = { send: (args) => { return args; } };
  //     mockTravel = sandbox.mock(TravelService);
  //     mockNext = sandbox.spy();
  //   });

  //   afterEach(() => sandbox.restore());

  //   it('Should patch travel as expected', async () => {
  //     mockTravel
  //       .expects('patchTravel')
  //       .once()
  //       .withArgs(1, { x: 1, y: 2 })
  //       .resolves({ result: true });

  //     const req = { params: { travelId: 1 }, body: { x: 1, y: 2 } };
  //     await TravelController.patchTravel(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ statusCode: 201 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });

  //   it('Should fail', async () => {
  //     mockTravel
  //       .expects('patchTravel')
  //       .once()
  //       .withArgs(1, { x: 1, y: 2 })
  //       .rejects();

  //     const req = { params: { travelId: 1 }, body: { x: 1, y: 2 } };
  //     await TravelController.patchTravel(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ message: "Unexpected Error", statusCode: 500 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });
  // });

  // describe('checkDriverConfirmation', () => {
  //   let mockTravel;
  //   let mockNext;

  //   let objTest;

  //   beforeEach(() => {
  //     objTest = { send: (args) => { return args; } };
  //     mockTravel = sandbox.mock(TravelService);
  //     mockNext = sandbox.spy();
  //   });

  //   afterEach(() => sandbox.restore());

  //   it('Should patch travel as expected', async () => {
  //     mockTravel
  //       .expects('checkDriverConfirmation')
  //       .once()
  //       .withArgs(1)
  //       .resolves({ result: true });

  //     const req = { params: { travelId: 1 }, body: { x: 1, y: 2 } };
  //     await TravelController.checkDriverConfirmation(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ statusCode: 200, data: { result: true } });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });

  //   it('Should fail', async () => {
  //     mockTravel
  //       .expects('checkDriverConfirmation')
  //       .once()
  //       .withArgs(1)
  //       .rejects();

  //     const req = { params: { travelId: 1 }, body: { x: 1, y: 2 } };
  //     await TravelController.checkDriverConfirmation(req, objTest, mockNext);
  //     expect(objTest.customResponse).to.deep.equal({ message: "Unexpected Error", statusCode: 500 });
  //     expect(mockNext.calledOnce).to.equal(true);
  //     sandbox.verify();
  //   });
  // });
});