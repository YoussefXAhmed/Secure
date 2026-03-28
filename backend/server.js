const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express(); 

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/password_manager')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Models
const User = mongoose.model('User', {
  email: String,
  password: String
});

const Password = mongoose.model('Password', {
  userId: String,
  site: String,
  username: String,
  password: String,
  deleted: { type: Boolean, default: false }
});

// Auth Middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('No token');

  try {
    const decoded = jwt.verify(token, 'secret123');
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};

// Signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  res.json(user);
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Wrong password');

  const token = jwt.sign({ id: user._id }, 'secret123');
  res.json({ token });
});

// Change Password
app.put('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.userId);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).send('Wrong old password');

  const hashed = await bcrypt.hash(newPassword, 10);

  user.password = hashed;
  await user.save();

  res.send('Password updated');
});

// Get passwords
app.get('/passwords', auth, async (req, res) => {
  const data = await Password.find({ userId: req.userId, deleted: false });
  res.json(data);
});

// Add password
app.post('/passwords', auth, async (req, res) => {
  const item = await Password.create({
    ...req.body,
    userId: req.userId
  });
  res.json(item);
});

// Delete → Trash
app.delete('/passwords/:id', auth, async (req, res) => {
  await Password.findByIdAndUpdate(req.params.id, { deleted: true });
  res.send('Moved to trash');
});

// Trash
app.get('/trash', auth, async (req, res) => {
  const data = await Password.find({ userId: req.userId, deleted: true });
  res.json(data);
});

// Restore
app.put('/restore/:id', auth, async (req, res) => {
  await Password.findByIdAndUpdate(req.params.id, { deleted: false });
  res.send('Restored');
});

app.listen(5000, () => console.log('Server running on http://16.170.159.191:5000'));