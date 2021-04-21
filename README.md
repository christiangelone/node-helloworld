<div style="background: #1E1E1E;
  border-radius: 5px;
  margin-top: 25px;
  margin-bottom: 40px;
  padding: 10px 8px 4px 10px;
  border: white 5px outset;
  box-shadow: 2px 2px 2px grey,
    2px 2px 17px grey,
    2px 2px 17px grey, 
    2px 2px 17px grey;">
  <img style="margin-right:2px;margin-left:2px;border:#4278C0 5px solid;border-radius: 5px;background: #4278c0;" src="https://img.shields.io/badge/-^3.1.6-white?style=flat&logo=typescript"/>
</div>

# NodeTS base

## Covered so far
 * Routing via annotations &nbsp;(done)
 * Folder structure based on domain entities &nbsp;(done)
 * Testing with Jest &nbsp;(done)
 * Code coverage & reports: &nbsp;`/api/coverage` (done) 
 * Documentation defined with code integrated with Swagger UI:&nbsp;`/api/docs` &nbsp;(done) 
 * Debugging integration with Chrome DevTools &nbsp;(done)
 * Common errors objects and middlewares built in &nbsp;(done)
 * Injectable dependencies &nbsp;(done)
 * Jenkins Pipeline defined and deploy to EB script &nbsp;(done)
 * Extensible logger system with standard implementation &nbsp;(done)
 * Implementation of API's essential endpoints: &nbsp;`GET [/api/health /api/info]`(done)
 * Performance metrics: &nbsp;`/appmetrics-dash` &nbsp;(done)
 * HTTP/HTTPS support &nbsp;(done)

## How to test ?
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  $&nbsp; ``` npm test ```

## How to run ?

### Dev mode
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  $&nbsp;``` npm run dev ```

### Prod mode
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  $&nbsp;``` npm run prod ```

## How to debug ?

 * Put a `debugger;` line, before where you like inspect and run:

### Dev mode
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  $&nbsp;``` npm run debug dev ```

### Prod mode
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
  $&nbsp;``` npm run debug prod ```

  * Then open your Node dev tools in chrome, to start debugging.
