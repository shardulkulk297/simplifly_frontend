import React, { useState } from 'react'
import Navbar from './Navbar';

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
    <div className='d-flex flex-column min-vh-100 bg-light'>
      {/* Header */}

      <Navbar />

      {/* Search Section */}
      <div className='flex-grow 1 d-flex align-items-center'>
        <div className='container text-center py-5'>
          <h1 className=''>Find Your Perfect Flight</h1>
          <p className='lead mb-4'>Search and compare flights from hundreds of airlines worldwide with the best prices guaranteed</p>
          {/* Search Form */}
          <div className='card mx-auto' style={{ maxWidth: '600px' }}>
            <div className='card-body'>
              <div className='row g-3'>
                <div className='col-md-4'>
                  <input
                    type="text"
                    className='form-control'
                    placeholder="From"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  />
                </div>
                <div className='col-md-4'>
                  <input
                    type="text"
                    className='form-control'
                    placeholder="To"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
                <div className="col-12 d-grid">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleSearch}
                  >
                    🔍 Search Flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Features */}
        <div className='row mt-5 g-4'>
          <div>
            <div>💰</div>
            <h5>Best Prices</h5>
            <p>Compare prices from 500+ airlines worldwide</p>
          </div>
          <div>
            <div>⚡</div>
            <h5>Instant Booking</h5>
            <p>Book flights in just a few clicks</p>
          </div>
          <div>
            <div>🛡️</div>
            <h5>Secure Payment</h5>
            <p>Your transactions are 100% secure</p>
          </div>
        </div>

        {/* Footer */}

      </div>
      <footer className="bg-white text-center py-4 mt-auto bg-light shadow ">
        <div className='container'>
          <p className='text-muted text-black'>© 2025 SkyBooker. All rights reserved.</p>
          <div>
            <span className='me-3'><a href="#">Privacy Policy </a></span>
            <span className='me-3'><a href="#">Terms of Service</a></span>
            <span><a href="#">Contact Us</a></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Search
