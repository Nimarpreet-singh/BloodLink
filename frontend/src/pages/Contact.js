import React, { useState } from 'react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '700px' }}>
        <h1 className="page-title">Contact Us</h1>
        <p className="page-sub">Have questions or want to collaborate? Reach out to the BloodLink team.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
          {[
            { icon: '📧', label: 'Email', value: 'contact@bloodlink.in' },
            { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
            { icon: '📍', label: 'Location', value: 'Chandigarh, Punjab, India' },
            { icon: '⏰', label: 'Hours', value: '24/7 for emergencies' },
          ].map(item => (
            <div key={item.label} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{item.label}</div>
                <div style={{ fontWeight: '500' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header"><h3>Send a Message</h3></div>
          <div className="card-body">
            {submitted ? (
              <div className="alert alert-success">✅ Message sent! We'll get back to you within 24 hours.</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
