const express = require('express');
const Quiz = require('../models/Quiz');
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
  

// Submit answers and get score
router.post('/results', async (req, res) => {
  const { answers } = req.body;
  let score = 0;

  try {
    for (const [questionId, answer] of Object.entries(answers)) {
      const quiz = await Quiz.findById(questionId);
      if (quiz.correctAnswer === answer) score++;
    }
    res.json({ score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedback (mock implementation)
router.get('/feedback', async (req, res) => {
  const feedback = "Great job! Keep practicing to improve your skills.";
  res.json(feedback);
});

module.exports = router;