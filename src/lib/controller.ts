export default class ApiController {

  constructor(protected name: string = 'Controller'){ 
    console.log(`${name} loaded.`); 
  }
}