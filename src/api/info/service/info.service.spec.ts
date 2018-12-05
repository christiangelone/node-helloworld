import chai from 'chai';
import InfoService from './info.service';
import { Container } from '@decorators/di';
import Info from '../model/info.model';
const expect = chai.expect;

describe('InfoService', () => {

  describe('getInfo', () => {
    it('Should retrieve the api info', done => {
      const service: InfoService = Container.get<InfoService>(InfoService);
      const info: Info = service.getInfo();
      expect(info.toJson()).to.eql({
        version: Info.VERSION,
        author: Info.AUTHOR
      });
      done();
    });
  });

});