/**
 * Created by jahansj on 18/10/2016.
 */
"use strict";

module.exports = (request) => {
  return new Promise((resolve, reject) => {
    let chunks = [];

    request.on('error', (err) => {
      reject(err);
      
    }).on('data', (chunk) => {
      chunks.push(chunk);
      
    }).on('end', () => {
      resolve(
        Buffer.concat(chunks).toString()
      );
    });
  });
};