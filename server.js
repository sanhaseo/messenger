const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/api/users');
const contactsRoute = require('./routes/api/contacts');
const conversationsRoute = require('./routes/api/conversations');

// In dev, use .env file for config vars.
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// Middlewares.
app.use(express.json());

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes.
app.use('/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/contacts', contactsRoute);
app.use('/api/conversations', conversationsRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));