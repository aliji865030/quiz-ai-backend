// server.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const OpenAI = require('openai'); // Import OpenAI SDK

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Use API routes
app.use('/api', apiRoutes);

// Feedback route
app.post('/api/feedback', async (req, res) => {
  const { score } = req.body;
  const totalQuestions = 5; // Assuming there are always 5 questions
  const feedbackPrompt = `You scored ${score} out of ${totalQuestions}. Provide feedback based on this score.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use the appropriate model
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: feedbackPrompt },
      ],
    });

    const feedback = completion.choices[0].message.content;
    res.json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback from OpenAI:', error);
    res.status(500).json({ message: 'Error fetching feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});