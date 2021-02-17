// Declare a login middleware for checking user session
exports.requireLogin = (req, res, next) => {
  if(req.session && req.session.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}