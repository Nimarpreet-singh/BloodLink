import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRequests } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RecipientDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequests()
      .then(({ data }) => setRequests(data.filter(r => r.recipient?._id === user.id)))
      .finally(() => setLoading(false));
  }, [user.id]);

  const urgencyClass = (level) => ({ Critical: 'badge-critical', Urgent: 'badge-urgent', Normal: 'badge-normal' }[level] || 'badge-normal');

  return (
    <div>
      <div className="dashboard-header">
        <div className="container">
          <h1>Welcome, {user.fullName} 👋</h1>
          <p>Manage your blood requests and find donors</p>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--red)' }}>{requests.length}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>My Requests</div>
            </div>
            <Link to="/search" className="card" style={{ padding: '24px', textAlign: 'center', display: 'block', transition: 'all 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem' }}>🔍</div>
              <div style={{ fontWeight: '600', marginTop: '4px' }}>Search Donors</div>
            </Link>
            <Link to="/recipient/request/new" className="card" style={{ padding: '24px', textAlign: 'center', display: 'block', transition: 'all 0.2s', cursor: 'pointer' }}>
              <div style={{ fontSize: '2rem' }}>➕</div>
              <div style={{ fontWeight: '600', marginTop: '4px' }}>New Request</div>
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>My Blood Requests</h2>
            <Link to="/recipient/request/new" className="btn btn-primary btn-sm">+ Create Request</Link>
          </div>

          {loading && <div className="loading"><div className="spinner"></div></div>}
          {!loading && requests.length === 0 && (
            <div className="empty-state">
              <div className="icon">📋</div>
              <p>No requests yet. <Link to="/recipient/request/new" style={{ color: 'var(--red)' }}>Create your first request</Link></p>
            </div>
          )}
          {requests.map(req => (
            <div key={req._id} className="request-card">
              <div className={`request-card-header ${req.urgencyLevel}`}>
                <div>
                  <strong>{req.patientName}</strong>
                  <span style={{ fontSize: '0.85rem', marginLeft: '10px', color: 'var(--text-muted)' }}>{req.hospitalName}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span className={`badge ${urgencyClass(req.urgencyLevel)}`}>{req.urgencyLevel}</span>
                  <span className="badge badge-blood">{req.bloodGroup}</span>
                </div>
              </div>
              <div className="request-info">
                <div className="request-info-item"><div className="label">Units Required</div><div className="value">{req.unitsRequired} units</div></div>
                <div className="request-info-item"><div className="label">Location</div><div className="value">{req.city}, {req.state}</div></div>
                <div className="request-info-item"><div className="label">Required By</div><div className="value">{new Date(req.requiredDate).toLocaleDateString()}</div></div>
                <div className="request-info-item"><div className="label">Contact</div><div className="value">{req.contactNumber}</div></div>
                <div className="request-info-item"><div className="label">Hospital Address</div><div className="value">{req.hospitalAddress || '—'}</div></div>
                <div className="request-info-item"><div className="label">Notes</div><div className="value">{req.notes || '—'}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboard;
