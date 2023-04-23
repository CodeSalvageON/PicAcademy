// Important server stuff

const fs = require('fs');
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Other modules

const reqProm = require(__dirname + '/request-promise.js');

// Routes

app.get('', function (req, res) {
  const index = __dirname + '/public/static/v1.html';

  res.sendFile(index);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});