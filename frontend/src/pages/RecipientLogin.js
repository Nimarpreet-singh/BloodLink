import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRecipient } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RecipientLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await loginRecipient(form);
      login(data.user, data.token);
      navigate('/recipient/dashboard');
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
          <h2>Recipient Login</h2>
          <p>Sign in to search for donors and create requests</p>
        </div>
        <div className="auth-body">
          {error && <div className="alert alert-error">{error}</div>}
          <div className="alert alert-success" style={{ fontSize: '0.82rem' }}>
            Demo: <strong>rajesh@example.com</strong> / <strong>password123</strong>
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
          Not registered? <Link to="/recipient/register">Register as Recipient</Link>
        </div>
      </div>
    </div>
  );
};

export default RecipientLogin;
