const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recipient') return res.status(403).json({ message: 'Only recipients can create requests' });
    const request = await BloodRequest.create({ ...req.body, recipient: req.user.id });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const requests = await BloodRequest.find().populate('recipient', 'fullName email phone').sort('-createdAt');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id).populate('recipient', 'fullName email phone');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
