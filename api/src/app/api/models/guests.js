const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const GuestSchema = new Schema({
  documentId: {
    type: String,
    trim: true,
    required: true,
    index: true,
  },
  documentType: {
    type: String,
    trim: true,
    required: true,
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
  checkInDate: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    trim: true,
  },
  roomType: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model('Guest', GuestSchema);
