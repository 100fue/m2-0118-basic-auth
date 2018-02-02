const express = require('express');
const router = express.Router();
const path = require('path');
const debug = require('debug')(`m2-0118-basic-auth:${path.basename(__filename).split('.')[0]}`);
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/User');


router.get('/signup', function(req, res, next) {
  res.render('auth/signup',{title:"Signup"});
});

router.post('/signup', function(req, res, next) {
  const {username, password} = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }

  // Hash the password
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password: hashPass
  });

  newUser.save((err) => {
    if(err){
      return next(err);
    }
    debug(`Se ha creado el usuario ${username}`);
    res.redirect("/");
  });
});

module.exports = router;
