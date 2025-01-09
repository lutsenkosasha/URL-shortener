import express from 'express';
import mongoose from 'mongoose';
import routes from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://mongo:27017/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

app.use(express.static('public'));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});