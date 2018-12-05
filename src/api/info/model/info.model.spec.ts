import chai from 'chai';
import { Container } from '@decorators/di';
import Info from './info.model';
const expect = chai.expect;

describe('Info', () => {

  describe('getAuthor', () => {
    it('Should retrieve the author name', done => {
      const info: Info = new Info();
      expect(info.getAuthor()).to.equal(Info.AUTHOR);
      done();
    });
  });

  describe('getVersion', () => {
    it('Should retrieve the api version', done => {
      const info: Info = new Info();
      expect(info.getVersion()).to.equal(Info.VERSION);
      done();
    });
  });

});
