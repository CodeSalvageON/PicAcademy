// Important server stuff
const express = require('express');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Other modules

const rp = require('request-promise');

// Routes

app.get('', function (req, res) {
  const index = __dirname + '/public/v1/static/v1.html';

  res.sendFile(index);
});

// POST

const requestBeginning = String(process.env.requestBeginning);
const spaceRemover = String(process.env.spaceRemover);
const linkProtect = String(process.env.linkProtect);
const secureConnection = String(process.env.secureConnection);

app.post('/getresult', function (req, res) {
  const questionRes = req.body.quest;
  console.log(questionRes);
  const refinedQuestion = questionRes.replace(" ", spaceRemover);
  
  rp(requestBeginning + refinedQuestion)
  .then(function (html) {
    const data_array = html.split(linkProtect);
    const all_array = [];
    let turn = 0;

    for (i = 0; i < data_array.length; i++) {
      if (data_array[i].includes(secureConnection)) {
        const link_array = data_array[i].split('"');

        if (turn === 0) {
          // PASS 
          turn = turn + 1;
        }

        else {
          all_array.push(link_array[1]);
        }
      }
    }

    res.send(JSON.stringify(all_array));
  })
  .catch(function (err) {
    throw err;
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});