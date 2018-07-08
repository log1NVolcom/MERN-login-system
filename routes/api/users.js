const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../../config/keys");
//Item Model
const User = require("../../models/User");

router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        sucess: false,
        msg: "Failed do register user"
      });
    } else {
      res.json({
        sucess: true,
        msg: "User registered"
      });
    }
  });
});

router.post("/auth", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw error;

    if (!user) {
      return res.json({
        sucess: false,
        msg: "User not found"
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        return res.json({
          sucess: true,
          token: "Jwt " + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({
          sucess: false,
          msg: "Wrong password!"
        });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res, next) => {
    res.json({
      user: req.user
    });
  }
);
module.exports = router;
