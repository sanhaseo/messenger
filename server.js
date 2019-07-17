const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
// Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/api/users');
const conversationsRoute = require('./routes/api/conversations')(io);

// In dev, use .env file for config vars.
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}

// Middlewares.
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Socket.io
io.on('connection', socket => {
  console.log('a user connected');
  socket.on('disconnect', () => console.log('user disconnected'));
});

// Use routes.
app.use('/auth', authRoute);
app.use('/api/users', usersRoute);
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
server.listen(port, () => console.log(`Server running on port ${port}`));