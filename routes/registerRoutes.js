const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.status(200).render('register');
});

router.post('/', async (req, res) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let userName = req.body.userName.trim();
  let email = req.body.email.trim();
  let password = req.body.password;
  let passwordConf = req.body.passwordConf;

  let payload = req.body;

  // Validate all form data are entered
  if (firstName && lastName && userName && email && password && passwordConf) {
    const user = await User.findOne({
      // check userName or email
      $or: [{ userName: userName }, { email: email }],
    });

    if (!user) {
      // no user found
      const data = req.body;
      data.password = await bcrypt.hash(data.password, 10);
      User.create(data).then((user) => {
        req.session.user = user;
        return res.redirect('/');
      });
    } else {
      // user found
      if (email == user.email) {
        payload.errorMessage = 'Email already in use.';
      } else {
        payload.errorMessage = 'Username already in use.';
      }
      res.status(200).render('register', payload);
    }
  } else {
    payload.errorMessage = 'Make sure each field has a valid value';
    res.status(200).render('register', payload);
  }
});

module.exports = router;
