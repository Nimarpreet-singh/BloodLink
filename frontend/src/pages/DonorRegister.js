import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerDonor } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATES = ['Andhra Pradesh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'];

const DonorRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', dateOfBirth: '', gender: '', phone: '', email: '', password: '',
    city: '', state: '', country: 'India', pinCode: '',
    govIdType: '', govIdNumber: '',
    bloodGroup: '', weight: '', lastDonationDate: '',
    availableForEmergency: true, statesWillingToTravel: '',
    agreeTerms: false,
  });

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agreeTerms) return setError('Please agree to the terms and conditions.');
    setLoading(true); setError('');
    try {
      const payload = {
        ...form,
        statesWillingToTravel: form.statesWillingToTravel ? form.statesWillingToTravel.split(',').map(s => s.trim()) : [],
        weight: form.weight ? Number(form.weight) : undefined,
        lastDonationDate: form.lastDonationDate || undefined,
      };
      delete payload.agreeTerms;
      const { data } = await registerDonor(payload);
      login(data.user, data.token);
      navigate('/donor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <div className="auth-header">
          <h2>Donor Registration</h2>
          <p>Join our network and save lives</p>
        </div>
        <div className="auth-body">
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="section-divider">Personal Information</div>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-control" value={form.fullName} onChange={set('fullName')} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date of Birth *</label>
                <input type="date" className="form-control" value={form.dateOfBirth} onChange={set('dateOfBirth')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Gender *</label>
                <select className="form-control" value={form.gender} onChange={set('gender')} required>
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input className="form-control" value={form.phone} onChange={set('phone')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-control" value={form.email} onChange={set('email')} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input type="password" className="form-control" value={form.password} onChange={set('password')} required minLength={6} />
            </div>

            <div className="section-divider">Address</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input className="form-control" value={form.city} onChange={set('city')} required />
              </div>
              <div className="form-group">
                <label className="form-label">State *</label>
                <select className="form-control" value={form.state} onChange={set('state')} required>
                  <option value="">Select State</option>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country</label>
                <input className="form-control" value={form.country} onChange={set('country')} />
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code</label>
                <input className="form-control" value={form.pinCode} onChange={set('pinCode')} />
              </div>
            </div>

            <div className="section-divider">Identity</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">ID Type</label>
                <select className="form-control" value={form.govIdType} onChange={set('govIdType')}>
                  <option value="">Select</option>
                  <option>Aadhaar</option><option>PAN</option><option>Passport</option><option>Driving License</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">ID Number</label>
                <input className="form-control" value={form.govIdNumber} onChange={set('govIdNumber')} />
              </div>
            </div>

            <div className="section-divider">Medical Information</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Blood Group *</label>
                <select className="form-control" value={form.bloodGroup} onChange={set('bloodGroup')} required>
                  <option value="">Select</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Weight (kg)</label>
                <input type="number" className="form-control" value={form.weight} onChange={set('weight')} min={45} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Last Donation Date</label>
              <input type="date" className="form-control" value={form.lastDonationDate} onChange={set('lastDonationDate')} />
            </div>

            <div className="section-divider">Availability</div>
            <div className="form-group">
              <label className="checkbox-wrapper">
                <input type="checkbox" checked={form.availableForEmergency} onChange={set('availableForEmergency')} />
                Available for Emergency Donation
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">States Willing to Travel To (comma-separated)</label>
              <input className="form-control" value={form.statesWillingToTravel} onChange={set('statesWillingToTravel')} placeholder="e.g. Punjab, Haryana, Delhi" />
            </div>

            <div className="section-divider">Consent</div>
            <div className="form-group">
              <label className="checkbox-wrapper">
                <input type="checkbox" checked={form.agreeTerms} onChange={set('agreeTerms')} />
                I agree to the Terms and Conditions and confirm my information is accurate
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register as Donor'}
            </button>
          </form>
        </div>
        <div className="auth-footer">
          Already registered? <Link to="/donor/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default DonorRegister;
