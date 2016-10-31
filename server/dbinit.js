/**
 * Created by jahansj on 31/10/2016.
 */
module.exports = (MongoClient, URL) => MongoClient.connect(URL, (err, db) => {
  if (err !== null) {
    console.log(`Error connecting to MongoDB server: ${err}`);
    return;
  }
  
  console.log('Connected to MongoDB server.');
  db.close();
});