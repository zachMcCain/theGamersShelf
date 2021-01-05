require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const port = 3000
const db = require('../database/queries.js')
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '../public')))

app.use(bodyParser.json())

app.post('/api/addToUserCollection', function(req, res) {
  console.log('The data sent: ', req.body);
  db.addUserGame(1, req.body, (result => res.send(result)));
  // res.send('Hello world');
})

app.get('/api/getUserCollection', function(req, res) {
  db.getUserInfo(1, (result) => {
    res.send(result);
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})