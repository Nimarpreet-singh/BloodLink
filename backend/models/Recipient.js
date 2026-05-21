const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  hospitalName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Recipient', recipientSchema);
