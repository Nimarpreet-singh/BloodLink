import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginDonor } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DonorLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await loginDonor(form);
      login(data.user, data.token);
      navigate('/donor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card card">
        <div className="auth-header">
          <h2>Donor Login</h2>
          <p>Welcome back! Sign in to your donor account</p>
        </div>
        <div className="auth-body">
          {error && <div className="alert alert-error">{error}</div>}
          <div className="alert alert-success" style={{ fontSize: '0.82rem' }}>
            Demo: <strong>arjun@example.com</strong> / <strong>password123</strong>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <div className="auth-footer">
          Not registered? <Link to="/donor/register">Register as Donor</Link>
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
