import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;