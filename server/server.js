const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

const emailHandler = require('./controllers/emails.js');

//app.use(express.static(path.join(__dirname, '/../client/public')));


app.use('/emails', emailHandler);



const server = app.listen(port, function () {
  console.log('Listening on port ', port);
});
