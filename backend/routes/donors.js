const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const authMiddleware = require('../middleware/auth');

router.get('/search', async (req, res) => {
  try {
    const { bloodGroup, state, city } = req.query;
    const filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (state) filter.state = new RegExp(state, 'i');
    if (city) filter.city = new RegExp(city, 'i');
    const donors = await Donor.find(filter).select('-password');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find().select('-password');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id).select('-password');
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Unauthorized' });
    const { password, ...rest } = req.body;
    const donor = await Donor.findByIdAndUpdate(req.params.id, rest, { new: true }).select('-password');
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
