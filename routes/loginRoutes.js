const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.status(200).render('login');
});

router.post('/', async (req, res) => {
  const { userName, password } = req.body;

  const payload = req.body;
  
  if(userName && password) {
    const user = await User.findOne({
      // check userName or email
      $or: [
        {userName: userName },
        {email: userName }
      ]
    })
    .catch(err => {
      console.log(err);
      payload.errorMessage = 'Something went wrong!';
      res.status(200).render('/login', payload);
    });

    if(user) {
      const result = await bcrypt.compare(password, user.password);
      if(result === true) {
        req.session.user = user;
        return res.redirect('/');
      }
    }

    payload.errorMessage = 'Login cridentials incorrect!'
    res.status(200).render('login', payload)
  } else {
    payload.errorMessage = 'Make sure each field has a valid value.'
    res.status(200).render('login', payload)
  }
  res.status(200).render('login');
});

module.exports = router;