const mongoose = require('mongoose');
const dotEnv = require('dotenv');

// Configure dot env file
dotEnv.config()

// Possible to use two ways
mongoose.set('useUnifiedTopology', true);

class Database {
  constructor(uri) {
    this.uri = uri;
    //this.connect();
  }
  connect = () => {
  mongoose.connect(this.uri, {useNewUrlParser: true})
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log('Database connection error'));
  }
}

const uri = process.env.MONGODB_URI;

module.exports = new Database(uri);