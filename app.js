const express = require('express');
const path = require('path');
const dotEnv = require('dotenv');
const expressSession = require('express-session');
const middleware = require('./util/middleware');
const connection = require('./util/database');

const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configure dotenv file
dotEnv.config();

// Configure template engine
app.set('view engine', 'pug');
app.set('views', 'views')

// Configure static files repository
app.use(express.static(path.join(__dirname, 'public')));

// Configure database connection
connection.connect();

// Extract form data
app.use(express.json())
app.use(express.urlencoded({ extended: false}));

// Configure user session 
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
}))

// configure routes
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)

app.get('/', middleware.requireLogin ,(req,res) => {
  const payload = {
    pageTitle: 'Home',
    userLoggedIn: req.session.user,
  }
  res.status(200).render('home', payload);
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});