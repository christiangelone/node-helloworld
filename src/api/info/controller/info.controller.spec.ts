import chai from 'chai';
import chaiHttp from 'chai-http';
import { Api } from '../../../api';

chai.use(chaiHttp);
const expect = chai.expect;
const serverRequest = chai.request(Api);

describe('HealthController', () => {

  describe('GET /api/info', () => {
    it('Should respond with API info', done => {
      serverRequest.get('/api/info')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.ownProperty('version');
          expect(res.body).to.ownProperty('author');
          done();
        })
    });
  })

});
