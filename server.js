const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

mongoose.connect('mongodb://localhost:27017/auth-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/auth-system-sessions' })
}));

const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
