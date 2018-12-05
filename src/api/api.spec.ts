import chai from 'chai';
import chaiHttp from 'chai-http';
import { Api } from '../api';

chai.use(chaiHttp);
const expect = chai.expect;
const serverRequest = chai.request(Api);

describe('API', () => {

  describe('GET /api', () => {
    it('Should respond with API page', done => {
      serverRequest.get('/api')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
          done();
        })
    });
  })

});
