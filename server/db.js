const mongoose = require("mongoose");                              
const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook";                              

const connectToMongo = () => {                              
  mongoose
    .connect(mongoURI, {                              
      useNewUrlParser: true,                              
      useUnifiedTopology: true,                              
    })                              
    .then(() => {                              
      console.log("Connected to MongoDB successfully");                              
    })
    .catch((error) => {                              
      console.error("Error connecting to MongoDB:", error.message);                              
    });                              
};

module.exports = connectToMongo;
