import express from 'express';
import { connectDB } from './db/index.js';


const app = express();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});








connectDB().then(() => {app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});});




