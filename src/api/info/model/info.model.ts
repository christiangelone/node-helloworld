export default class Info {

  static VERSION: string = '0.0.0';
  static AUTHOR: string = 'Christian Angelone';

  private version: string;
  private author: string;

  constructor(){
    this.version = Info.VERSION;
    this.author = Info.AUTHOR;
  }

  getVersion(){
    return this.version;
  }

  getAuthor(){
    return this.author;
  }

  toJson(){
    return {
      version: this.version,
      author: this.author
    };
  }
};