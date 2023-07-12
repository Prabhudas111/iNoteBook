const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Name is Required"],
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, "Name is Required"],
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
