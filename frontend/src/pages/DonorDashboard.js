import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDonorById } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDonorById(user.id)
      .then(({ data }) => setDonor(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.id]);

  if (loading) return <div className="loading"><div className="spinner"></div><p>Loading...</p></div>;
  if (!donor) return <div className="loading"><p>Could not load profile.</p></div>;

  return (
    <div>
      <div className="dashboard-header">
        <div className="container">
          <h1>Welcome, {donor.fullName} 👋</h1>
          <p>Your donor profile is {donor.availableForEmergency ? 'active and visible to recipients' : 'currently marked as unavailable'}</p>
        </div>
      </div>

      <div className="dashboard-body">
        <div className="container">
          <div className="dashboard-grid">
            <div>
              <div className="card info-card" style={{ marginBottom: '20px', textAlign: 'center', padding: '28px 20px' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--red)', fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>{donor.bloodGroup}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>Blood Group</div>
                <div style={{ marginTop: '14px' }}>
                  <span className={`badge ${donor.availableForEmergency ? 'badge-available' : 'badge-unavailable'}`}>
                    {donor.availableForEmergency ? '✅ Emergency Available' : '⏸ Not Available'}
                  </span>
                </div>
              </div>
              <Link to={`/donor/edit`} className="btn btn-outline btn-full" style={{ marginBottom: '12px' }}>Edit Profile</Link>
            </div>

            <div>
              <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-header"><h3>Personal Details</h3></div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                    {[
                      ['Full Name', donor.fullName],
                      ['Age', `${donor.age} years`],
                      ['Gender', donor.gender],
                      ['Phone', donor.phone],
                      ['Email', donor.email],
                      ['Blood Group', donor.bloodGroup],
                      ['Weight', donor.weight ? `${donor.weight} kg` : 'N/A'],
                      ['City', donor.city],
                      ['State', donor.state],
                      ['PIN Code', donor.pinCode || 'N/A'],
                      ['Last Donation', donor.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'First time'],
                      ['ID Type', donor.govIdType || 'N/A'],
                    ].map(([label, value]) => (
                      <div key={label} className="info-item">
                        <div className="info-label">{label}</div>
                        <div className="info-value">{value}</div>
                      </div>
                    ))}
                  </div>
                  {donor.statesWillingToTravel?.length > 0 && (
                    <div className="info-item">
                      <div className="info-label">States Willing to Travel</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        {donor.statesWillingToTravel.map(s => (
                          <span key={s} style={{ background: 'var(--red-light)', color: 'var(--red)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
                  <div style={{ padding: '16px', background: 'var(--gray)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--red)' }}>🩸</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Active Donor</div>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--gray)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--red)' }}>{donor.availableForEmergency ? '✅' : '⏸'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Emergency</div>
                  </div>
                  <div style={{ padding: '16px', background: 'var(--gray)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--red)' }}>{donor.statesWillingToTravel?.length || 0}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Travel States</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
