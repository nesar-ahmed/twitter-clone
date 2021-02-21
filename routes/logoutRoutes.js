const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.redirect('/login');
  }
});

module.exports = router;
