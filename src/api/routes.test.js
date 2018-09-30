const chai = require('chai');
const  expect = chai.expect;

const app = require('../../app');
chai.use(require('chai-http'));
let serverRequest = chai.request(app);

describe('API', () => {
  describe('GET /api',() => {
    it('Should respond with API info', done =>  {
      serverRequest.get('/api')
      .end((err,res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.ownProperty('version');
        expect(res.body).to.ownProperty('author');
        expect(res.body).to.ownProperty('health');
        expect(res.body.health).to.equal('OK');
        done();
      })
    }); 
  })
});