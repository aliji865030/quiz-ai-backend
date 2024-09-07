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

  // generate ai feedback

const aiFeedback = async (score) => {
  const genAI = new GoogleGenerativeAI("AIzaSyAFvtxFvcKyNhXJ-ggJZnPRiAxmuLJFUgA");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `i score ${score} out of 5 in an quiz write a brief feedback`;
  
  const result = await model.generateContent(prompt);
  const feedback = result.response.text()
  return feedback;
  }
  
  // Feedback route
  router.post('/feedback', async (req, res) => {
    const { score } = req.body;
  
    try {
      const feedback = await aiFeedback(score);
      res.json({ feedback });
    } catch (error) {
      console.error('Error generating feedback:', error);
      res.status(500).json({ message: 'Error generating feedback' });
    }
  });
  

export default router