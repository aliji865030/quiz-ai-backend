import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.js'; 
import { GoogleGenerativeAI } from "@google/generative-ai";


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.use('/api', apiRoutes); 


// // generate ai feedback

// const aiFeedback = async (score) => {
// const genAI = new GoogleGenerativeAI("AIzaSyAFvtxFvcKyNhXJ-ggJZnPRiAxmuLJFUgA");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = `i score ${score} out of 5 in an quiz write a brief feedback`;

// const result = await model.generateContent(prompt);
// const feedback = result.response.text()
// return feedback;
// }

// // Feedback route
// app.post('/api/feedback', async (req, res) => {
//   const { score } = req.body;

//   try {
//     const feedback = await aiFeedback(score);
//     res.json({ feedback });
//   } catch (error) {
//     console.error('Error generating feedback:', error);
//     res.status(500).json({ message: 'Error generating feedback' });
//   }
// });

// MongoDB connection
mongoose.connect("mongodb+srv://abbasalichand786:Baga2BsymsTWvBv4@cluster0.twbzd.mongodb.net/",)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});