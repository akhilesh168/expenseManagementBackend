const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const connectToDb = require('./config/db');
connectToDb();
const passport = require('passport');
const users = require('./routes/api/users');
const trips = require('./routes/api/trips');
const expenses = require('./routes/api/expenses');

//const { MongoClient, ServerApiVersion } = require('mongodb');
let cors = require('cors');
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
const port = 5000;
app.listen(process.env.PORT || port, () => {
  console.log('server ready');
});
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);

app.use('/api/trips', passport.authenticate('jwt', { session: false }), trips);

app.use(
  '/api/expenses',
  passport.authenticate('jwt', { session: false }),
  expenses
);

module.exports = app;
