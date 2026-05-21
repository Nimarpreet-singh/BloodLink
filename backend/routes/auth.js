const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Donor = require('../models/Donor');
const Recipient = require('../models/Recipient');

router.post('/register-donor', async (req, res) => {
  try {
    const { email, password, dateOfBirth, ...rest } = req.body;
    const exists = await Donor.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const dob = new Date(dateOfBirth);
    const age = Math.floor((Date.now() - dob) / (365.25 * 24 * 3600 * 1000));
    const donor = await Donor.create({ email, password: hashed, dateOfBirth: dob, age, ...rest });
    const token = jwt.sign({ id: donor._id, role: 'donor' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: donor._id, fullName: donor.fullName, email: donor.email, role: 'donor' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login-donor', async (req, res) => {
  try {
    const { email, password } = req.body;
    const donor = await Donor.findOne({ email });
    if (!donor) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, donor.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: donor._id, role: 'donor' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: donor._id, fullName: donor.fullName, email: donor.email, role: 'donor' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register-recipient', async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const exists = await Recipient.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const recipient = await Recipient.create({ email, password: hashed, ...rest });
    const token = jwt.sign({ id: recipient._id, role: 'recipient' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: recipient._id, fullName: recipient.fullName, email: recipient.email, role: 'recipient' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login-recipient', async (req, res) => {
  try {
    const { email, password } = req.body;
    const recipient = await Recipient.findOne({ email });
    if (!recipient) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, recipient.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: recipient._id, role: 'recipient' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: recipient._id, fullName: recipient.fullName, email: recipient.email, role: 'recipient' } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
