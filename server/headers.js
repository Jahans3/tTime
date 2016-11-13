/**
 * Created by jahansj on 26/10/2016.
 */
"use strict";

module.exports = (req, res, next) => {
  let allowOrigin;
  
  if (req.headers.referer.indexOf('http://localhost:8000') !== -1) {
    allowOrigin = req.headers.origin;
  }

  console.log('origins allowed: ' + allowOrigin);

  res.set({
    'Access-Control-Allow-Origin' : allowOrigin,
    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers' : 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': 'true'
  });

  return next();
};