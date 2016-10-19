"use strict";

const datapipe = require('./datapipe');

const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.headers);
  // console.log(req.headers['user-agent']);

  datapipe(req)
    .then((data) => {
      res.writeHead(200, {
        'X-Powered-By' : 'toast',
        'X-Toaster-Type' : 'grill/toaster',
        'X-Sides' : 'meat/bacon,meat/sausages,eggs/scrambled'
      });

      if (String(req.url) === '/hello') {
        res.writeHead(200, {
          'X-Hello-Type' : 'sup'
        });
        res.end('hi');
      }

      const myRes = {
        userAgent: req.headers['user-agent'],
        body: data,
        url: req.url
      };
      
      res.end(JSON.stringify(myRes));
    }).catch((err) => {
      res.statusCode = 404;
      res.end(`error in data stream: ${err}`);
    });
});

server.listen(3030);