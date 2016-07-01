import Xhr from '../../index';

const expect = chai.expect;

describe('Xhr - API', () => {
  it('should return a Promise', () => {
    const message = 'Returned value is not a Promise instance.';
    const promise = Xhr({
      url: 'http://localhost:3000/test'
    });

    promise.then(() => {
      expect(promise instanceof Promise).to.equal(true, message);
      done();
    });
  });

});

describe('Xhr - GET', () => {
  it('should return a valid JSON response from /json', () => {
    const promise = Xhr({
      url: 'http://localhost:3000/json'
    });

    promise.then((res) => {
      const data = JSON.parse(res.data);
      expect(data.status).to.equal(200);
      expect(data.message).to.equal('OK');
      done();
    });
  });
});
