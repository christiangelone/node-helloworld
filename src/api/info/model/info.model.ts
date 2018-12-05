export default class Info {

  static VERSION: string = process.env.API_VERSION || 'no_version';
  static AUTHOR: string = process.env.API_AUTHOR || 'anonymous';

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