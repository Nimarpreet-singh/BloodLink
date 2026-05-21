import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRequest } from '../services/api';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATES = ['Andhra Pradesh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'];

const CreateRequest = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    patientName: '', bloodGroup: '', unitsRequired: '', urgencyLevel: 'Normal',
    hospitalName: '', hospitalAddress: '', city: '', state: '',
    requiredDate: '', contactNumber: '', notes: '',
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await createRequest({ ...form, unitsRequired: Number(form.unitsRequired) });
      navigate('/recipient/requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '680px' }}>
        <h1 className="page-title">Create Blood Request</h1>
        <p className="page-sub">Post a blood requirement and reach available donors</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="section-divider">Patient Details</div>
              <div className="form-group">
                <label className="form-label">Patient Name *</label>
                <input className="form-control" value={form.patientName} onChange={set('patientName')} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Blood Group Required *</label>
                  <select className="form-control" value={form.bloodGroup} onChange={set('bloodGroup')} required>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg}>{bg}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Units Required *</label>
                  <input type="number" className="form-control" value={form.unitsRequired} onChange={set('unitsRequired')} min={1} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Urgency Level *</label>
                <select className="form-control" value={form.urgencyLevel} onChange={set('urgencyLevel')}>
                  <option>Normal</option><option>Urgent</option><option>Critical</option>
                </select>
              </div>

              <div className="section-divider">Hospital Information</div>
              <div className="form-group">
                <label className="form-label">Hospital Name *</label>
                <input className="form-control" value={form.hospitalName} onChange={set('hospitalName')} required />
              </div>
              <div className="form-group">
                <label className="form-label">Hospital Address</label>
                <input className="form-control" value={form.hospitalAddress} onChange={set('hospitalAddress')} />
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

              <div className="section-divider">Contact & Schedule</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Required Date *</label>
                  <input type="date" className="form-control" value={form.requiredDate} onChange={set('requiredDate')} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Number *</label>
                  <input className="form-control" value={form.contactNumber} onChange={set('contactNumber')} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea className="form-control" rows={3} value={form.notes} onChange={set('notes')} style={{ resize: 'vertical' }} placeholder="Any additional information..." />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Blood Request'}
                </button>
                <button type="button" className="btn btn-gray" onClick={() => navigate('/recipient/dashboard')}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
