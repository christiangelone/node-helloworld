const express = require('express')
const app = express()

app.get('/', (req, res) => res.send(`
  <h1 style="font-size: 80px; color: #28AF5C;text-align: center; margin-top: 100px;">
    Hello World!
  </h1>
  <p style="font-size: 24px; color: black;text-align: center; margin-top: 20px;">
    <b>Environment:</b> ${ process.env.NODE_ENV }
  </p>
`))

const apiRoutes = require('./src/api/routes');
app.use('/api', apiRoutes);

if(process.env.NODE_ENV !== 'testing')
  app.listen(3333, () => console.log('Hello World listening on port 3333!...'))

module.exports = app;