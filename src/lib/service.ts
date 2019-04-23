export default abstract class ApiService {

  constructor(protected name: string = 'Service'){ 
    console.log(`${name} loaded.`); 
  }
}