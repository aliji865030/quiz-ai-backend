import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRoutes from './routes/api.js'; 


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

app.use('/api', apiRoutes); 


// MongoDB connection
mongoose.connect("mongodb+srv://abbasalichand786:Baga2BsymsTWvBv4@cluster0.twbzd.mongodb.net/",)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});