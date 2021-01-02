require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const port = 3000

app.use(express.static(path.join(__dirname, '../public')))



app.listen(port, function() {
  console.log(`Listening on port ${port}`)
})