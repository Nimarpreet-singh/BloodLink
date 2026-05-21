import React from 'react';

const About = () => (
  <div>
    <section className="about-hero">
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>About BloodLink</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          A platform built to eliminate the gap between blood donors and those in critical need.
        </p>
      </div>
    </section>

    <section style={{ padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ marginBottom: '28px' }}>
          <div className="card-header"><h3>Our Mission</h3></div>
          <div className="card-body">
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              BloodLink was created to solve a critical gap in healthcare — the disconnect between willing blood donors and patients in urgent need. Traditional blood banks often face shortages, especially for rare blood groups. BloodLink bypasses this by creating a direct network of donors who can be contacted in real time.
            </p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '28px' }}>
          <div className="card-header"><h3>The Problem We Solve</h3></div>
          <div className="card-body">
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '16px' }}>
              Every year, millions of patients die due to unavailability of blood. Stored blood has a limited shelf life of 35–42 days and is often wasted. Rare blood groups like AB- and O- are especially scarce in blood banks.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
              By connecting recipients directly with registered donors, BloodLink enables faster response, zero storage wastage, and access to rare blood types through a wider donor network.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><h3>Key Features</h3></div>
          <div className="card-body">
            <ul style={{ color: 'var(--text-muted)', lineHeight: '2', paddingLeft: '20px' }}>
              <li>Real-time donor search by blood group, city, and state</li>
              <li>Emergency availability tagging for urgent cases</li>
              <li>Blood request creation with urgency levels</li>
              <li>Direct contact information shared between parties</li>
              <li>Secure JWT-based authentication for donors and recipients</li>
              <li>Fully responsive design for mobile access in emergencies</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
