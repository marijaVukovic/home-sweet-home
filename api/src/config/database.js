// Set up mongoose connection
const mongoose = require('mongoose');
const createDefaultUser = require('./create-default-user');

const mongoDB = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const connectPromise = mongoose.connect(mongoDB, { useNewUrlParser: true });

// if (process.env.NODE_ENV === 'development') {
connectPromise.then(createDefaultUser);
// }

mongoose.Promise = global.Promise;

module.exports = mongoose;
