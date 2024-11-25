const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      id: user.id, 
      name: user.name, 
      email: user.email 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;
