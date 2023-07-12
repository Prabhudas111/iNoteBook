const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://prabhaaa:prabhaaa9866@cluster0.l9ik2gn.mongodb.net/iNotebook?retryWrites=true&w=majority";

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
