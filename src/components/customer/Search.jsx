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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {

    if (!origin || !destination || !date) {
      toast.error('Please fill in all fields');
      return;
    }
    console.log('Searching flights:', { origin, destination, date });

    const mainDate = new Date()

    if (!returnDate & trip !== "Round") {
      const getOneWayFlights = () => {
        try {
          searchFlights(dispatch)(origin, destination, date);
          navigate("/customer/search-results", {
            state: { origin, destination, date }
          });
        } catch (error) {
          toast.success("Server Failed to Fetch Flights")
          console.log(error);
        }
      }
      getOneWayFlights();
    }
    else {
      const getReturnFlights = async () => {
        toast.success("Wait for that logic");
      }
      getReturnFlights()
    }
  };

  return (
    <div className='d-flex flex-column min-vh-100 bg-light'>

      <div className='flex-grow-1 d-flex align-items-center'>
        <div className='container text-center py-5'>
          <div className='shadow bg-light rounded p-10 pb-5 pt-5'>
            <h1 className=''>Find Your Perfect Flight</h1>
            <p className='lead mb-4'>Search and compare flights from hundreds of airlines worldwide with the best prices guaranteed</p>

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
                    <div className="form-check">
                      <input className="form-check-input" type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={(e) => setTrip(e.target.value)}
                      />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Round
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onChange={(e) => setTrip(e.target.value)}
                      />
                      <label className="form-check-label" for="flexRadioDefault2">
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



        <div className='row justify-content-end mt-5 m-5 g-1'>
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
