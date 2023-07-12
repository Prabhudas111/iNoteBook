const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "prabhuisagoodb$oy";
//POST : http://localhost:5000/api/auth/createuser

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast of 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ success, errors: errors.array() });
    }

    //create a new user
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(404)
          .json({
            success,
            error: "sorry! user with this email already exists",
          });
      }
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      //   res.json({ Successful: "Entry created", user: user });
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured");
    }
  }
);
//Authenticate a user : POST : http://localhost:5000/api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    //Authenticate the user with login credentials.
    const { email, password } = req.body;
    try {
      let success = false;
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please login with correct credentials" });
      }
      //check whether the input password is correct or not
      const confirmPassword = await bcrypt.compare(password, user.password);
      if (!confirmPassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      //   res.json({ Successful: "Entry created", user: user });
      success = true;
      res.json({ success, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured");
    }
  }
);

//Get login details of the user POST : http://localhost:5000/api/auth/getuser Login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
