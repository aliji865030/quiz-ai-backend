
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

const apiRoutes = require('./routes/api'); 
app.use('/api', apiRoutes); 


// Feedback route
app.post('/api/feedback', (req, res) => {
  const { score } = req.body;

  // Call the feedback function to get a random feedback message
  const feedback = getRandomFeedback(score);

  // Send the feedback as a response
  res.json({ feedback });
});

// Function to get feedback based on score
const getRandomFeedback = (score) => {
  const feedbackMessages = {
    5: [
      "Excellent! You got all answers correct! Your understanding of the material is impressive.",
      "Fantastic job! You clearly know your stuff. Keep up the great work!",
      "Outstanding performance! You nailed every question. You're a quiz master!",
      "Perfect score! Your knowledge is top-notch. Keep it up!",
      "Amazing! You answered everything correctly. You're a star!",
      "Bravo! All correct answers! Your hard work is paying off.",
      "Impressive! You have a strong grasp of the concepts. Well done!",
      "Superb! You showed exceptional knowledge. Keep learning!",
      "Great job! You should be proud of this achievement!",
      "Top marks! You have demonstrated excellent understanding."
    ],
    4: [
      "Great job! You missed just one question. You're very close to perfection!",
      "Well done! You clearly understand the material, just a little more practice needed.",
      "Almost perfect! Just one mistake. Keep reviewing the concepts!",
      "Excellent effort! You have a solid grasp of the topics.",
      "Fantastic! You're doing really well. Just a bit more focus on the details.",
      "Good work! One wrong answer doesn't take away from your strong performance.",
      "Impressive! You're just a step away from a perfect score.",
      "Very good! You clearly have a good understanding of the material.",
      "Nice job! Keep studying, and you'll get that perfect score next time!",
      "Great effort! You're on the right track, just keep practicing."
    ],
    3: [
      "Good effort! You got half right. Review the material to improve further.",
      "Not bad! You have a decent understanding, but there's room for improvement.",
      "You're making progress! Focus on the areas you missed to boost your score.",
      "Average score! You know some of the material, but more study will help.",
      "Decent job! With a bit more effort, you can improve significantly.",
      "You’re halfway there! Keep working on the concepts you found challenging.",
      "Solid attempt! Aim to understand the questions you missed.",
      "You're on the right path! More practice will lead to better scores.",
      "Fair performance! Analyze your mistakes to enhance your learning.",
      "You're improving! Keep at it, and you'll see better results."
    ],
    2: [
      "Not bad! But there's room for improvement. Consider revisiting the material.",
      "You have some understanding, but focus on the areas you struggled with.",
      "You're getting there! More practice will help solidify your knowledge.",
      "Fair attempt! Review the questions you missed for better understanding.",
      "You've made a start! Keep studying, and you'll see improvement.",
      "You're making progress! Focus on the concepts that need more attention.",
      "Average performance! Consider using additional resources for study.",
      "You can do better! Analyze your mistakes and learn from them.",
      "You're on the right track! Keep practicing to boost your confidence.",
      "You have potential! With more effort, you can improve your score."
    ],
    1: [
      "You might want to review the material. Don't get discouraged!",
      "It's a start! Every attempt is a step towards improvement.",
      "Keep practicing! Understanding will come with time and effort.",
      "Don't be discouraged! Everyone starts somewhere. Keep at it!",
      "You have room to grow! Focus on the basics to build a strong foundation.",
      "It's okay! Use this as a learning opportunity to improve.",
      "You can do it! With dedication, you'll see progress.",
      "Every mistake is a chance to learn. Keep trying!",
      "You have potential! Keep working hard, and you'll improve.",
      "Remember, practice makes perfect! Keep studying."
    ],
    0: [
      "Don't be discouraged! Keep practicing, and you'll get better.",
      "Everyone has off days. Use this as motivation to improve.",
      "This is just a starting point! Keep learning and trying.",
      "It's okay! Learning takes time, and you're on your way.",
      "You can only go up from here! Keep pushing yourself.",
      "Mistakes are part of the learning process. Don't give up!",
      "You have the potential to improve! Stay positive and keep studying.",
      "Use this experience to fuel your motivation to learn.",
      "Every expert was once a beginner. Keep at it!",
      "Remember, every attempt is a step towards success!"
    ]
  };

  // Get the array of messages for the given score
  const messages = feedbackMessages[score] || feedbackMessages[0]; 

  // Select a random feedback message
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

// MongoDB connection
mongoose.connect("mongodb+srv://abbasalichand786:Baga2BsymsTWvBv4@cluster0.twbzd.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});