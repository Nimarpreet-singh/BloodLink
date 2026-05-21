import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRecipient } from '../services/api';
import { useAuth } from '../context/AuthContext';

const STATES = ['Andhra Pradesh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'];

const RecipientRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', password: '', city: '', state: '', hospitalName: '',
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await registerRecipient(form);
      login(data.user, data.token);
      navigate('/recipient/dashboard');
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
          <h2>Recipient Registration</h2>
          <p>Register to search for blood donors</p>
        </div>
        <div className="auth-body">
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-control" value={form.fullName} onChange={set('fullName')} required />
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
            <div className="form-group">
              <label className="form-label">Hospital Name (optional)</label>
              <input className="form-control" value={form.hospitalName} onChange={set('hospitalName')} placeholder="Associated hospital, if any" />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Registering...' : 'Register as Recipient'}
            </button>
          </form>
        </div>
        <div className="auth-footer">
          Already registered? <Link to="/recipient/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RecipientRegister;
