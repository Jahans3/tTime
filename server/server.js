"use strict";

const datapipe = require('./datapipe');
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  datapipe(req)
    .then((data) => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin' : 'http://localhost:8000',
        'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers' : 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': 'true'
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
        url: req.url,
        method: req.method
      };

      res.end(JSON.stringify(myRes));
    }).catch((err) => {
      res.statusCode = 404;
      res.end(`error in data stream: ${err}`);
    });
});

server.listen(3030);

const io = require('socket.io')(server);
const events = require('./events')(io);