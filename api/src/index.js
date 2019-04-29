// inject variables from root/api/.env file
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { execSync } = require('child_process');
const guests = require('./routes/guests');
const users = require('./routes/users');

// mapping localhost to absolute ip
if (!process.env.DB_HOSTNAME || process.env.DB_HOSTNAME === 'localhost') {
  const ip = String(execSync('/sbin/ip route|awk \'/default/ { print $3 }\'')).trim();
  process.env.DB_HOSTNAME = ip;
}

const mongoose = require('./config/database'); // database configuration


// create app
const app = express();

// enable cors for all
// TODO: enable cors for whitelisted domains only
app.use(cors());

// jwt secret token
app.set('secretKey', process.env.SECRET_KEY);

// connection to mongodb
// eslint-disable-next-line no-console
setTimeout(() => console.log('connecting to database...'), 0);
// eslint-disable-next-line no-console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// eslint-disable-next-line no-console
mongoose.connection.on('connect', console.log.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end('Server is working');
});

// public route
app.use('/users', users);

// private route
app.use('/guests', guests);

// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle errors
app.use((err, req, res) => {
  if (err.status === 404) {
    res.status(404).json({ message: 'Not found' });
  }
  else {
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

// server
const PORT = process.env.API_PORT || '3030';
const HOST = process.env.API_HOST || '0.0.0.0';

app.listen(PORT, HOST);
// eslint-disable-next-line no-console
console.log(`Node server running on ${HOST}:${PORT}`);
