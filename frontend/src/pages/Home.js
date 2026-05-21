import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <section className="hero">
      <div className="container">
        <h1>Save Lives.<br />Donate Blood.</h1>
        <p>BloodLink connects willing donors directly with patients in need — no blood banks, no wastage, just humanity helping humanity.</p>
        <div className="hero-actions">
          <Link to="/donor/register" className="btn btn-white">Become a Donor</Link>
          <Link to="/recipient/register" className="btn btn-white-outline">I Need Blood</Link>
          <Link to="/search" className="btn btn-white-outline">Find Donors</Link>
        </div>
      </div>
    </section>

    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-label">Registered Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Blood Groups Covered</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5+</div>
            <div className="stat-label">Blood Requests</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0%</div>
            <div className="stat-label">Blood Wastage</div>
          </div>
        </div>
      </div>
    </section>

    <section className="features-section">
      <div className="container">
        <h2 className="section-title">How BloodLink Works</h2>
        <p className="section-sub">Simple, fast, and life-saving in three steps.</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Register as Donor</h3>
            <p>Fill in your blood group, location, and availability. It takes just 2 minutes to potentially save a life.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search Donors</h3>
            <p>Recipients can instantly search for compatible donors by blood group, state, and city — no waiting.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Connect & Save</h3>
            <p>Contact donors directly via phone or email. Real people, real connections, real lives saved.</p>
          </div>
        </div>
      </div>
    </section>

    <section style={{ background: 'var(--red-light)', padding: '70px 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Every Drop Counts</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '560px', margin: '0 auto 32px', fontSize: '1.05rem' }}>
          One unit of blood can save up to three lives. There is no substitute for human blood — only you can help.
        </p>
        <Link to="/donor/register" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
          Register as a Donor Today
        </Link>
      </div>
    </section>

    <section style={{ padding: '70px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: '40px' }}>Blood Group Compatibility</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map(bg => (
            <div key={bg} className="card" style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--red)', fontFamily: 'Playfair Display, serif' }}>{bg}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                {bg === 'O-' ? 'Universal Donor' : bg === 'AB+' ? 'Universal Recipient' : 'Blood Group'}
              </div>
              <Link to={`/search?bloodGroup=${encodeURIComponent(bg)}`} className="btn btn-outline btn-sm" style={{ marginTop: '14px' }}>
                Find Donors
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Home;
