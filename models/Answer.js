// models/Book.js

const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Answer = mongoose.model('answer', AnswerSchema);