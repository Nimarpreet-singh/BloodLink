import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonorById, updateDonor } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATES = ['Andhra Pradesh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'];

const EditDonorProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getDonorById(user.id).then(({ data }) => {
      setForm({
        ...data,
        lastDonationDate: data.lastDonationDate ? data.lastDonationDate.split('T')[0] : '',
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
        statesWillingToTravel: Array.isArray(data.statesWillingToTravel) ? data.statesWillingToTravel.join(', ') : '',
      });
    }).finally(() => setLoading(false));
  }, [user.id]);

  const set = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const payload = {
        ...form,
        statesWillingToTravel: form.statesWillingToTravel ? form.statesWillingToTravel.split(',').map(s => s.trim()) : [],
        weight: form.weight ? Number(form.weight) : undefined,
      };
      await updateDonor(user.id, payload);
      setSuccess('Profile updated successfully!');
      setTimeout(() => navigate('/donor/dashboard'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <div className="loading"><div className="spinner"></div><p>Loading...</p></div>;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '680px' }}>
        <h1 className="page-title">Edit Profile</h1>
        <p className="page-sub">Update your donor information</p>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="section-divider">Personal Information</div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-control" value={form.fullName} onChange={set('fullName')} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-control" value={form.phone} onChange={set('phone')} />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender</label>
                  <select className="form-control" value={form.gender} onChange={set('gender')}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>

              <div className="section-divider">Address</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input className="form-control" value={form.city} onChange={set('city')} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <select className="form-control" value={form.state} onChange={set('state')}>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">PIN Code</label>
                <input className="form-control" value={form.pinCode || ''} onChange={set('pinCode')} />
              </div>

              <div className="section-divider">Medical</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select className="form-control" value={form.bloodGroup} onChange={set('bloodGroup')}>
                    {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input type="number" className="form-control" value={form.weight || ''} onChange={set('weight')} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Last Donation Date</label>
                <input type="date" className="form-control" value={form.lastDonationDate || ''} onChange={set('lastDonationDate')} />
              </div>

              <div className="section-divider">Availability</div>
              <div className="form-group">
                <label className="checkbox-wrapper">
                  <input type="checkbox" checked={form.availableForEmergency} onChange={set('availableForEmergency')} />
                  Available for Emergency Donation
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">States Willing to Travel (comma-separated)</label>
                <input className="form-control" value={form.statesWillingToTravel || ''} onChange={set('statesWillingToTravel')} placeholder="Punjab, Haryana, Delhi" />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" className="btn btn-gray" onClick={() => navigate('/donor/dashboard')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDonorProfile;
