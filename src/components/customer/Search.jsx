import React, { useState } from 'react'

const Search = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (!origin || !destination || !date) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Searching flights:', { origin, destination, date });
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg" style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)'
      }}>
        <div className="container">
          <span className="navbar-brand mb-0 h1" style={{ 
            color: '#1e293b',
            fontWeight: '700',
            fontSize: '1.5rem'
          }}>
            ✈️ SkyBooker
          </span>
          <div>
            <button 
              type="button" 
              className="btn btn-outline-primary me-2"
              style={{ 
                borderColor: '#3b82f6',
                color: '#3b82f6',
                borderRadius: '8px',
                paddingLeft: '24px',
                paddingRight: '24px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                border: '1.5px solid #3b82f6'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#3b82f6';
              }}
            >
              Login
            </button>
            <button 
              type="button" 
              className="btn"
              style={{ 
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                paddingLeft: '24px',
                paddingRight: '24px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div className="container">
          {/* Hero Text */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3" style={{ 
              color: '#1e293b',
              letterSpacing: '-0.5px'
            }}>
              Find Your Perfect Flight
            </h1>
            <p className="lead mb-4" style={{ 
              color: '#64748b',
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Search and compare flights from hundreds of airlines worldwide with the best prices guaranteed
            </p>
          </div>

          {/* Search Card */}
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="card shadow-lg border-0" style={{ 
                borderRadius: '16px',
                background: 'white',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}>
                <div className="card-body p-5">
                  <div className="row g-4">
                    {/* Origin */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2" style={{ color: '#374151' }}>
                        🛫 From
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter origin city"
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            fontSize: '16px',
                            padding: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#fafafa'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            e.target.style.backgroundColor = 'white';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                            e.target.style.backgroundColor = '#fafafa';
                          }}
                        />
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2" style={{ color: '#374151' }}>
                        🛬 To
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter destination city"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          style={{
                            borderRadius: '12px',
                            border: '2px solid #e5e7eb',
                            fontSize: '16px',
                            padding: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#fafafa'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#3b82f6';
                            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                            e.target.style.backgroundColor = 'white';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                            e.target.style.backgroundColor = '#fafafa';
                          }}
                        />
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2" style={{ color: '#374151' }}>
                        📅 Departure Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb',
                          fontSize: '16px',
                          padding: '16px',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#fafafa'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                          e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                          e.target.style.backgroundColor = '#fafafa';
                        }}
                      />
                    </div>

                    {/* Passengers */}
                    <div className="col-md-6">
                      <label className="form-label fw-semibold mb-2" style={{ color: '#374151' }}>
                        👥 Passengers
                      </label>
                      <select 
                        className="form-select form-select-lg"
                        style={{
                          borderRadius: '12px',
                          border: '2px solid #e5e7eb',
                          fontSize: '16px',
                          padding: '16px',
                          transition: 'all 0.3s ease',
                          backgroundColor: '#fafafa'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#3b82f6';
                          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                          e.target.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.boxShadow = 'none';
                          e.target.style.backgroundColor = '#fafafa';
                        }}
                      >
                        <option>1 Passenger</option>
                        <option>2 Passengers</option>
                        <option>3 Passengers</option>
                        <option>4+ Passengers</option>
                      </select>
                    </div>

                    {/* Trip Type */}
                    <div className="col-12">
                      <div className="d-flex gap-4 mb-3">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="tripType" 
                            id="roundTrip" 
                            defaultChecked
                            style={{ 
                              transform: 'scale(1.2)',
                              accentColor: '#3b82f6'
                            }}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="roundTrip" style={{ color: '#374151' }}>
                            Round Trip
                          </label>
                        </div>
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="tripType" 
                            id="oneWay"
                            style={{ 
                              transform: 'scale(1.2)',
                              accentColor: '#3b82f6'
                            }}
                          />
                          <label className="form-check-label fw-semibold" htmlFor="oneWay" style={{ color: '#374151' }}>
                            One Way
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="col-12 text-center">
                      <button
                        type="button"
                        className="btn btn-lg px-5 py-3"
                        style={{ 
                          backgroundColor: '#3b82f6',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '600',
                          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                          transition: 'all 0.3s ease',
                          minWidth: '200px'
                        }}
                        onClick={handleSearch}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#2563eb';
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = '#3b82f6';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                        }}
                      >
                        🔍 Search Flights
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="text-center p-4" style={{ 
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div className="mb-3" style={{ fontSize: '2.5rem' }}>💰</div>
                <h5 className="fw-bold mb-2" style={{ color: '#1e293b' }}>Best Prices</h5>
                <p style={{ color: '#64748b', margin: 0 }}>Compare prices from 500+ airlines worldwide</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center p-4" style={{ 
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div className="mb-3" style={{ fontSize: '2.5rem' }}>⚡</div>
                <h5 className="fw-bold mb-2" style={{ color: '#1e293b' }}>Instant Booking</h5>
                <p style={{ color: '#64748b', margin: 0 }}>Book flights in just a few clicks</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="text-center p-4" style={{ 
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div className="mb-3" style={{ fontSize: '2.5rem' }}>🛡️</div>
                <h5 className="fw-bold mb-2" style={{ color: '#1e293b' }}>Secure Payment</h5>
                <p style={{ color: '#64748b', margin: 0 }}>Your transactions are 100% secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center" style={{ 
        backgroundColor: '#f8fafc',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div className="container">
          <p className="mb-2" style={{ color: '#64748b' }}>
            © 2025 SkyBooker. All rights reserved.
          </p>
          <div className="d-flex justify-content-center gap-4">
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</a>
            <a href="#" style={{ color: '#64748b', textDecoration: 'none', fontWeight: '500' }}>Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Search