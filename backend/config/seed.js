const bcrypt = require('bcryptjs');
const Donor = require('../models/Donor');
const Recipient = require('../models/Recipient');
const BloodRequest = require('../models/BloodRequest');

const seedData = async () => {
  const donorCount = await Donor.countDocuments();
  if (donorCount > 0) return;

  const hashed = await bcrypt.hash('password123', 10);

  const donors = await Donor.insertMany([
    { fullName: 'Arjun Sharma', dateOfBirth: new Date('1995-03-15'), age: 29, gender: 'Male', phone: '9876543210', email: 'arjun@example.com', password: hashed, city: 'Mohali', state: 'Punjab', country: 'India', pinCode: '160071', govIdType: 'Aadhaar', govIdNumber: '1234-5678-9012', bloodGroup: 'B+', weight: 72, lastDonationDate: new Date('2023-06-01'), availableForEmergency: true, statesWillingToTravel: ['Punjab', 'Haryana', 'Delhi'] },
    { fullName: 'Priya Patel', dateOfBirth: new Date('1998-07-22'), age: 26, gender: 'Female', phone: '9123456780', email: 'priya@example.com', password: hashed, city: 'Chandigarh', state: 'Punjab', country: 'India', pinCode: '160001', govIdType: 'PAN', govIdNumber: 'ABCDE1234F', bloodGroup: 'A+', weight: 58, lastDonationDate: new Date('2023-09-10'), availableForEmergency: true, statesWillingToTravel: ['Punjab', 'Himachal Pradesh'] },
    { fullName: 'Rohit Verma', dateOfBirth: new Date('1993-11-05'), age: 31, gender: 'Male', phone: '9988776655', email: 'rohit@example.com', password: hashed, city: 'Delhi', state: 'Delhi', country: 'India', pinCode: '110001', govIdType: 'Driving License', govIdNumber: 'DL123456789', bloodGroup: 'O+', weight: 80, lastDonationDate: new Date('2024-01-15'), availableForEmergency: true, statesWillingToTravel: ['Delhi', 'Uttar Pradesh', 'Haryana'] },
    { fullName: 'Sneha Iyer', dateOfBirth: new Date('2000-02-14'), age: 24, gender: 'Female', phone: '9871234560', email: 'sneha@example.com', password: hashed, city: 'Mumbai', state: 'Maharashtra', country: 'India', pinCode: '400001', govIdType: 'Passport', govIdNumber: 'P1234567', bloodGroup: 'AB+', weight: 55, lastDonationDate: null, availableForEmergency: false, statesWillingToTravel: ['Maharashtra', 'Goa'] },
    { fullName: 'Karan Singh', dateOfBirth: new Date('1991-08-30'), age: 33, gender: 'Male', phone: '9765432180', email: 'karan@example.com', password: hashed, city: 'Ludhiana', state: 'Punjab', country: 'India', pinCode: '141001', govIdType: 'Aadhaar', govIdNumber: '9876-5432-1098', bloodGroup: 'O-', weight: 85, lastDonationDate: new Date('2023-12-20'), availableForEmergency: true, statesWillingToTravel: ['Punjab', 'Haryana', 'Rajasthan', 'Delhi'] },
    { fullName: 'Ananya Gupta', dateOfBirth: new Date('1997-05-19'), age: 27, gender: 'Female', phone: '9654321870', email: 'ananya@example.com', password: hashed, city: 'Bangalore', state: 'Karnataka', country: 'India', pinCode: '560001', govIdType: 'Aadhaar', govIdNumber: '5678-1234-9090', bloodGroup: 'A-', weight: 61, lastDonationDate: new Date('2023-10-05'), availableForEmergency: true, statesWillingToTravel: ['Karnataka', 'Tamil Nadu'] },
    { fullName: 'Vikram Nair', dateOfBirth: new Date('1989-12-01'), age: 35, gender: 'Male', phone: '9543218760', email: 'vikram@example.com', password: hashed, city: 'Hyderabad', state: 'Telangana', country: 'India', pinCode: '500001', govIdType: 'PAN', govIdNumber: 'XYZAB5678G', bloodGroup: 'B-', weight: 78, lastDonationDate: new Date('2024-02-10'), availableForEmergency: true, statesWillingToTravel: ['Telangana', 'Andhra Pradesh', 'Karnataka'] },
    { fullName: 'Meera Joshi', dateOfBirth: new Date('2001-09-11'), age: 23, gender: 'Female', phone: '9432187650', email: 'meera@example.com', password: hashed, city: 'Jaipur', state: 'Rajasthan', country: 'India', pinCode: '302001', govIdType: 'Aadhaar', govIdNumber: '3344-5566-7788', bloodGroup: 'AB-', weight: 52, lastDonationDate: null, availableForEmergency: false, statesWillingToTravel: ['Rajasthan'] },
    { fullName: 'Amit Yadav', dateOfBirth: new Date('1994-06-25'), age: 30, gender: 'Male', phone: '9321876540', email: 'amit@example.com', password: hashed, city: 'Patiala', state: 'Punjab', country: 'India', pinCode: '147001', govIdType: 'Driving License', govIdNumber: 'PB0120230001', bloodGroup: 'A+', weight: 75, lastDonationDate: new Date('2023-08-15'), availableForEmergency: true, statesWillingToTravel: ['Punjab', 'Haryana'] },
    { fullName: 'Divya Kapoor', dateOfBirth: new Date('1996-01-08'), age: 28, gender: 'Female', phone: '9210765430', email: 'divya@example.com', password: hashed, city: 'Amritsar', state: 'Punjab', country: 'India', pinCode: '143001', govIdType: 'Passport', govIdNumber: 'P9876543', bloodGroup: 'O+', weight: 60, lastDonationDate: new Date('2024-03-01'), availableForEmergency: true, statesWillingToTravel: ['Punjab', 'Himachal Pradesh', 'Delhi'] },
  ]);

  const recipients = await Recipient.insertMany([
    { fullName: 'Rajesh Kumar', phone: '9111222333', email: 'rajesh@example.com', password: hashed, city: 'Mohali', state: 'Punjab', hospitalName: 'Fortis Hospital' },
    { fullName: 'Sunita Devi', phone: '9222333444', email: 'sunita@example.com', password: hashed, city: 'Delhi', state: 'Delhi', hospitalName: 'AIIMS Delhi' },
  ]);

  await BloodRequest.insertMany([
    { recipient: recipients[0]._id, patientName: 'Ramesh Kumar', bloodGroup: 'B+', unitsRequired: 2, urgencyLevel: 'Urgent', hospitalName: 'Fortis Hospital Mohali', hospitalAddress: 'Sector 62, Phase VIII', city: 'Mohali', state: 'Punjab', requiredDate: new Date('2024-06-15'), contactNumber: '9111222333', notes: 'Post-surgery transfusion needed' },
    { recipient: recipients[0]._id, patientName: 'Geeta Singh', bloodGroup: 'O-', unitsRequired: 4, urgencyLevel: 'Critical', hospitalName: 'PGI Chandigarh', hospitalAddress: 'Sector 12', city: 'Chandigarh', state: 'Punjab', requiredDate: new Date('2024-06-12'), contactNumber: '9111222333', notes: 'Accident victim, critical condition' },
    { recipient: recipients[1]._id, patientName: 'Mohan Verma', bloodGroup: 'A+', unitsRequired: 1, urgencyLevel: 'Normal', hospitalName: 'AIIMS Delhi', hospitalAddress: 'Ansari Nagar', city: 'Delhi', state: 'Delhi', requiredDate: new Date('2024-06-20'), contactNumber: '9222333444', notes: 'Scheduled surgery' },
    { recipient: recipients[1]._id, patientName: 'Lakshmi Bai', bloodGroup: 'AB+', unitsRequired: 3, urgencyLevel: 'Urgent', hospitalName: 'Safdarjung Hospital', hospitalAddress: 'Safdarjung', city: 'Delhi', state: 'Delhi', requiredDate: new Date('2024-06-14'), contactNumber: '9222333444', notes: '' },
    { recipient: recipients[0]._id, patientName: 'Harbhajan Kaur', bloodGroup: 'B-', unitsRequired: 2, urgencyLevel: 'Urgent', hospitalName: 'Civil Hospital', hospitalAddress: 'Model Town', city: 'Ludhiana', state: 'Punjab', requiredDate: new Date('2024-06-16'), contactNumber: '9111222333', notes: 'Thalassemia patient' },
  ]);

  console.log('Sample data seeded');
};

module.exports = { seedData };
