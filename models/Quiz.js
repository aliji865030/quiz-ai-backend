// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

// module.exports = mongoose.model('Quiz', quizSchema);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;