const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipient', required: true },
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  unitsRequired: { type: Number, required: true },
  urgencyLevel: { type: String, enum: ['Normal', 'Urgent', 'Critical'], default: 'Normal' },
  hospitalName: { type: String, required: true },
  hospitalAddress: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  requiredDate: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
