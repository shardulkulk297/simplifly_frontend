import React, { useState } from 'react'
import Navbar from './Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { searchFlights } from '../../store/action/FlightAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Search = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [trip, setTrip] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const navigate = useNavigate();


  const handleSearch = (e) => {

    if (!origin || !destination || !date) {
      toast.error('Please fill in all fields');
      return;
    }
    console.log('Searching flights:', { origin, destination, date });

    const mainDate = new Date()

    if (Math.floor((new Date() - new Date(date)) / 86400000) === 1 && Math.floor((new Date() - new Date(returnDate)) / 86400000) === 1 ) {
      toast.error("Please Enter the correct date")
      return;
    }

    if (!returnDate & trip !== "Round") {
      const getOneWayFlights = async () => {
        try {
          const response = await axios.get("http://localhost:8080/api/flight/schedule/search", {
            params: {
              origin,
              destination,
              date
            }
          });
          console.log(response.data);
          navigate("/customer/search-results", { state: { flights: response.data, trip: trip } });

        } catch (error) {
          console.log(error);
        }

      }
      getOneWayFlights();
    }
    else {
      const getReturnFlights = async () => {
        try {
          const oneWay = await axios.get("http://localhost:8080/api/flight/schedule/search", {
            params: {
              origin,
              destination,
              date
            }
          });
          console.log(oneWay.data);

          const returnFlights = await axios.get("http://localhost:8080/api/flight/schedule/search", {
            params: {
              destination,
              origin,
              date
            }
          })
          console.log(returnFlights.data);
          navigate("/customer/search-results", { state: { flights: oneWay.data, returnFlights: returnFlights.data, trip: trip } });

        } catch (error) {
          console.log(error);
        }
      }
      getReturnFlights()
    }
  };

  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>
      {/* Header */}
      {/* Search Section */}
      <div className='flex-grow-1 d-flex align-items-center'>
        <div className='container text-center py-5'>
          <div className='shadow bg-light rounded p-10 pb-5 pt-5'>
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
                  <div className='col-md-4'>
                    <div class="form-check">
                      <input class="form-check-input" type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={(e) => setTrip(e.target.value)}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Round
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onChange={(e) => setTrip(e.target.value)}
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        One-way
                      </label>
                    </div>

                  </div>
                  <div className="col-md-4">
                    <label htmlFor="">Date Of Departure</label>
                    <input
                      type="date"
                      className="form-control"
                      value={date}
                      placeholder='Departure Date'
                      onChange={e => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="">Return</label>
                    <input
                      type="date"
                      className="form-control"
                      value={returnDate}
                      placeholder='Departure Date'
                      onChange={e => setReturnDate(e.target.value)}
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
        </div>
        {/* Features */}
        <div className='row justify-content-end mt-5 g-1'>
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
