import { Application } from "express";

export default class Initializer {
  
  constructor(private apply: (app: Application) => Application){}

  and(init: Initializer){
    return new Initializer((app: Application) => {
      this.apply(app);
      return init.apply(app)
    });
  }

  init(app: Application): Application {
    return this.apply(app)
  }
};