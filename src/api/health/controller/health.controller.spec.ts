import chai from 'chai';
import chaiHttp from 'chai-http';
import { Api } from '../../../api';

chai.use(chaiHttp);
const expect = chai.expect;
const serverRequest = chai.request(Api);

describe('HealthController', () => {

  describe('GET /api/health', () => {
    it('Should respond with API health status', done => {
      serverRequest.get('/api/health')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.ownProperty('status');
          expect(res.body.status).to.equal('UP');
          done();
        })
    });
  })

});
