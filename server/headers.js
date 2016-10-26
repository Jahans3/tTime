/**
 * Created by jahansj on 26/10/2016.
 */
module.exports = (req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin' : 'http://localhost:8000',
    'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers' : 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': 'true'
  });

  return next();
};