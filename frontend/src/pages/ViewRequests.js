import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRequests } from '../services/api';

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequests().then(({ data }) => setRequests(data)).finally(() => setLoading(false));
  }, []);

  const urgencyClass = (level) => ({ Critical: 'badge-critical', Urgent: 'badge-urgent', Normal: 'badge-normal' }[level]);

  if (loading) return <div className="loading"><div className="spinner"></div><p>Loading requests...</p></div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <h1 className="page-title">Blood Requests</h1>
            <p className="page-sub" style={{ margin: 0 }}>Active requests from recipients in need</p>
          </div>
          <Link to="/recipient/request/new" className="btn btn-primary">+ New Request</Link>
        </div>

        {requests.length === 0 && (
          <div className="empty-state"><div className="icon">📋</div><p>No blood requests posted yet.</p></div>
        )}

        {requests.map(req => (
          <div key={req._id} className="request-card">
            <div className={`request-card-header ${req.urgencyLevel}`}>
              <div>
                <strong style={{ fontSize: '1rem' }}>{req.patientName}</strong>
                <span style={{ fontSize: '0.85rem', marginLeft: '12px', color: 'var(--text-muted)' }}>{req.hospitalName} · {req.city}, {req.state}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className={`badge ${urgencyClass(req.urgencyLevel)}`}>{req.urgencyLevel}</span>
                <span className="badge badge-blood">{req.bloodGroup}</span>
              </div>
            </div>
            <div className="request-info">
              <div className="request-info-item"><div className="label">Units Needed</div><div className="value">{req.unitsRequired} units</div></div>
              <div className="request-info-item"><div className="label">Required By</div><div className="value">{new Date(req.requiredDate).toLocaleDateString()}</div></div>
              <div className="request-info-item"><div className="label">Contact</div><div className="value">{req.contactNumber}</div></div>
              <div className="request-info-item"><div className="label">Posted By</div><div className="value">{req.recipient?.fullName || 'N/A'}</div></div>
              <div className="request-info-item"><div className="label">Posted On</div><div className="value">{new Date(req.createdAt).toLocaleDateString()}</div></div>
              {req.notes && <div className="request-info-item"><div className="label">Notes</div><div className="value">{req.notes}</div></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRequests;
