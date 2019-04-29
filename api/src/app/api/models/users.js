const mongoose = require('mongoose');
const saltedMd5 = require('salted-md5');

const saltRounds = 10;

// Define a schema
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    index: true,
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

UserSchema.pre('save', function saveCB(next) {
  const user = this;
  user.password = saltedMd5(user.password, process.env.SECRET_KEY);
  next();
});

UserSchema.methods.comparePassword = candidatePassword => (
  saltedMd5(candidatePassword) === this.password
);

module.exports = mongoose.model('User', UserSchema);
