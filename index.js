const express = require('express');
const PORT = process.env.PORT || 8080;
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationsRoute = require('./routes/conversations');
const messagesRoute = require('./routes/messages');

dotenv.config();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log(`Connected to MongoDB`);
  }
);

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the homepage.' });
});
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/conversations', conversationsRoute);
app.use('/api/messages', messagesRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
