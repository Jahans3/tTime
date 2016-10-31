/**
 * Created by jahansj on 31/10/2016.
 */
module.exports = {
  insertMany: (db, collectionName, data, callback) => {
    const collection = db.collection(collectionName);
    const documentsLength = data.length;
    
    collection.insertMany([
        ...data
    ], (err, result) => {
      if (err !== null) {
        return console.log(`Error inserting into '${collectionName}' collection`);
      }
      
      if (result.ops.length !== documentsLength) {
        return console.log(`Error inserting ${documentsLength} documents into '${collectionName}' collection`);
      }
      
      callback(result);
    });
  }
};