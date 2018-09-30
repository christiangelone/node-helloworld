const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('<h1 style="font-size: 80px; color: #28AF5C;text-align: center; margin-top: 100px;">Hello World!</h1>'))

const apiRoutes = require('./src/api/routes');
app.use('/api', apiRoutes);

if(process.env.NODE_ENV !== 'testing')
  app.listen(3333, () => console.log('Listening on port 3333...'))

module.exports = app;