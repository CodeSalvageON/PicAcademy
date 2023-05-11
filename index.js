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
// const linkPreviewGenerator = require("link-preview-generator");
// const jsdom = require( 'jsdom' );
// let jsonRes = {};
const grabity = require("grabity");

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
const completeConnector = String(process.env.completeConnector);

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

app.post('/findrequest', async function (req, res) {
  const userAnswerRequest = req.body.url;
  const cleanRequest = completeConnector + userAnswerRequest;
  console.log(cleanRequest);
  
  // jsdom.env( {
  //   url: userAnswerRequest,
  //   scripts: [ "http://code.jquery.com/jquery.js" ],
  //   done: function( error, window ) {
  //     let $ = window.$;

  //     $('meta').each(function () {
  //       let name = $(this).attr('property');
  //       let value = $(this).attr('content');
        
  //       if (name) {
  //         jsonRes[ name.slice( 3 ) ] = value;
  //         console.log( name + ": " + value );
  //       }
  //     });
  //     res.send(jsonRes);
  //   }
  // });

  // const previewData = linkPreviewGenerator(
  //   userAnswerRequest
  // );

  // res.send(previewData);

  let acadResult = await grabity.grabIt(cleanRequest);
  res.send(acadResult);
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});