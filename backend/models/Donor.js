const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  age: { type: Number },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'India' },
  pinCode: { type: String },
  govIdType: { type: String, enum: ['Aadhaar', 'PAN', 'Passport', 'Driving License'] },
  govIdNumber: { type: String },
  bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  weight: { type: Number },
  lastDonationDate: { type: Date },
  availableForEmergency: { type: Boolean, default: true },
  statesWillingToTravel: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Donor', donorSchema);
