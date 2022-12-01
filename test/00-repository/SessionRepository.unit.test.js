// Testing
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const sandbox = require('sinon');

// Models
const global = require('../../src/global');

global.redisClient = {
  get: () => {
    console.log('get');
  },
  set: () => {
    console.log('set');
  },
  del: () => {
    console.log('del');
  }
};

// repository
const SessionRepository = require('../../src/repository/SessionRepository');

describe('SessionRepository Test Suite', () => {

  describe('validate', () => {
    let mock;

    beforeEach(() => {
      mock = sandbox.mock(global.redisClient);
    });

    afterEach(sandbox.restore);

    it('should validate the email', async () => {
      mock
        .expects('get')
        .once()
        .withArgs('ads')
        .resolves(true);

      const result = await SessionRepository.validate('ads');
      expect(result).to.equal(true);
      sandbox.verify();
    });

    it('should reject the email', async () => {
      mock
        .expects('get')
        .once()
        .withArgs('ads')
        .resolves(null);

      const result = await SessionRepository.validate('ads');
      expect(result).to.equal(false);
      sandbox.verify();
    });
  });

  describe('set', () => {
    let mock;

    beforeEach(() => {
      mock = sandbox.mock(global.redisClient);
    });

    afterEach(sandbox.restore);

    it('should set the email', async () => {
      mock
        .expects('set')
        .once()
        .withArgs('ads', 'token')
        .resolves({});

      const result = await SessionRepository.set('ads', 'token');
      expect(result).to.be.deep.equal({});
      sandbox.verify();
    });

    it('should not set email', async () => {
      mock
        .expects('set')
        .once()
        .withArgs('ads', 'token')
        .rejects({});

      await SessionRepository.set('ads', 'token')
        .catch(err => {
          expect(err).to.be.deep.equal({});
        });
      sandbox.verify();
    });
  });

  describe('delete', () => {
    let mock;

    beforeEach(() => {
      mock = sandbox.mock(global.redisClient);
    });

    afterEach(sandbox.restore);

    it('should delete the email', async () => {
      mock
        .expects('del')
        .once()
        .withArgs('ads')
        .resolves({});

      const result = await SessionRepository.delete('ads');
      expect(result).to.be.deep.equal({});
      sandbox.verify();
    });

    it('should not delete email', async () => {
      mock
        .expects('del')
        .once()
        .withArgs('ads')
        .rejects({});

      await SessionRepository.delete('ads')
        .catch(err => {
          expect(err).to.be.deep.equal({});
        });
      sandbox.verify();
    });
  });
});