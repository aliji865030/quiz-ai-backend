import express from 'express';
import Quiz from '../models/Quiz.js';
const router = express.Router();

// Upload quiz
router.post('/quizzes', async (req, res) => {
    try {
      const { text, options, correctAnswer } = req.body;
      const quiz = new Quiz({ text, options, correctAnswer });
      await quiz.save();
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


// Get all quizzes
router.get('/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find(); // Fetch quizzes from the database
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

export default router