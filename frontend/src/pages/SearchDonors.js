import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchDonors } from '../services/api';

const BLOOD_GROUPS = ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const STATES = ['', 'Andhra Pradesh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal'];

const SearchDonors = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    bloodGroup: searchParams.get('bloodGroup') || '',
    state: '',
    city: '',
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get('bloodGroup')) handleSearch();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const params = {};
      if (filters.bloodGroup) params.bloodGroup = filters.bloodGroup;
      if (filters.state) params.state = filters.state;
      if (filters.city) params.city = filters.city;
      const { data } = await searchDonors(params);
      setDonors(data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({ bloodGroup: '', state: '', city: '' });
    setDonors([]);
    setSearched(false);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Search Donors</h1>
        <p className="page-sub">Find blood donors in your area by blood group and location</p>

        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-grid">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Blood Group</label>
              <select className="form-control" value={filters.bloodGroup} onChange={e => setFilters(f => ({ ...f, bloodGroup: e.target.value }))}>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg || 'All Blood Groups'}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">State</label>
              <select className="form-control" value={filters.state} onChange={e => setFilters(f => ({ ...f, state: e.target.value }))}>
                {STATES.map(s => <option key={s} value={s}>{s || 'All States'}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">City</label>
              <input className="form-control" placeholder="e.g. Mohali" value={filters.city} onChange={e => setFilters(f => ({ ...f, city: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '...' : '🔍 Search'}
              </button>
              <button type="button" className="btn btn-gray" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </form>

        {loading && <div className="loading"><div className="spinner"></div><p>Searching donors...</p></div>}

        {searched && !loading && (
          <div style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Found <strong>{donors.length}</strong> donor{donors.length !== 1 ? 's' : ''}
          </div>
        )}

        {searched && !loading && donors.length === 0 && (
          <div className="empty-state">
            <div className="icon">😔</div>
            <p>No donors found for the selected filters. Try a broader search.</p>
          </div>
        )}

        <div className="donors-grid">
          {donors.map(donor => (
            <div key={donor._id} className="donor-card">
              <div className="donor-card-header">
                <div>
                  <div className="donor-name">{donor.fullName}</div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.8, marginTop: '2px' }}>{donor.gender} · {donor.age} yrs</div>
                </div>
                <div className="blood-badge">{donor.bloodGroup}</div>
              </div>
              <div className="donor-card-body">
                <div className="donor-detail"><span>📍</span><span>{donor.city}, {donor.state}</span></div>
                <div className="donor-detail"><span>📞</span><span>{donor.phone}</span></div>
                <div className="donor-detail"><span>✉️</span><span>{donor.email}</span></div>
                {donor.lastDonationDate && (
                  <div className="donor-detail"><span>🩸</span><span>Last donated: {new Date(donor.lastDonationDate).toLocaleDateString()}</span></div>
                )}
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className={`badge ${donor.availableForEmergency ? 'badge-available' : 'badge-unavailable'}`}>
                    {donor.availableForEmergency ? '✅ Emergency Available' : '⏸ Not Available'}
                  </span>
                </div>
                {donor.statesWillingToTravel?.length > 0 && (
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <strong>Travels to:</strong> {donor.statesWillingToTravel.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDonors;
