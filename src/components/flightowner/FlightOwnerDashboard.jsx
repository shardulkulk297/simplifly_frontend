import React, { useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { fetchLoggedInUser } from '../../store/action/UserInfoAction';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFlights, getOwnerFlights } from '../../store/action/FlightAction';
import { getAllSchedules } from '../../store/action/ScheduleAction';
import GetBookings from './GetBookings';

const FlightOwnerDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const loggedInUser = useSelector(state => state.UserInfo.loggedInUser)

    const [loading, setLoading] = useState(false);
    const flights = useSelector(state => state.allFlights.flights);
    const schedules = useSelector(state => state.schedules.schedules);

    useEffect(() => {
        const getName = async () => {
            fetchLoggedInUser(dispatch)
        }
        getName();
    }, [])


    // useEffect(() => {
    //     const getFlights = async () => {
    //         try {
    //             setLoading(true);
    //             await fetchAllFlights(dispatch);
    //             setLoading(false)
    //         } catch (error) {
    //             console.log(error);
    //             setLoading(false);
    //         }
    //     }
    //     getFlights();

       
    // }, [])

    // useEffect(()=>{
    //     const getSchedules = async()=>{
    //             try {
    //             setLoading(true);
    //             await getAllSchedules(dispatch);
    //             setLoading(false)
    //         } catch (error) {
    //             console.log(error);
    //             setLoading(false);
    //         }

    //     }
    //     getSchedules();
    // },[])

   

    if (loading) {
        return (
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-12 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading flights...</p>
                    </div>
                </div>
            </div>
        )
    }

    /*
    Filtering all the flights for today's date
    */

    const today = new Date().toISOString().split('T')[0];
    const todaysFlights = schedules.filter((f) => {
        return f.departureTime.startsWith(today);
    })





    return (
        <div className="container py-4">
            {/* Header Section */}
            <div className="text-center mb-5">
                <h1 className="display-5 fw-bold">Welcome, {loggedInUser.companyName} <span role="img" aria-label="pilot">🧑‍✈️</span></h1>
                <p className="lead text-muted">Manage your flights with ease</p>
            </div>

            {/* Stats Cards */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="fw-bold text-primary">{schedules.length}</h3>
                            <p className="text-muted mb-0">Total Flights in Schedule</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="fw-bold text-primary">{flights.length}</h3>
                            <p className="text-muted mb-0">Total Flights</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="fw-bold text-primary">50%</h3>
                            <p className="text-muted mb-0">Average Bookings</p>
                        </div>
                    </div>
                </div>


                {/* Action Buttons */}
                <h2 className='text-center'>Today's Flights,✈️</h2>
                <div className='row'>
                    {
                        todaysFlights.length === 0 ? (
                            <p className='text-center text-muted'>No flights scheduled for today.</p>
                        ) :
                            todaysFlights.map((f, index) =>
                                <div className="col-md-6 col-lg-4 mb-4" key={index}>
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">FLIGHT {f.flight.flightNumber}</h5>
                                            <p className="card-text mb-1">
                                                <strong>Route:</strong> {f.flight.route.origin}  → {f.flight.route.destination} ({f.flight.route.duration})
                                            </p>
                                            <p className="card-text mb-1">
                                                <strong>Departure:</strong> {f.departureTime}
                                            </p>
                                            <p className="card-text mb-3">
                                                <strong>Arrival:</strong> {f.arrivalTime}
                                            </p>

                                            <p className="card-text mb-1">
                                                <strong>Baggage:</strong> Check‑in {f.flight.baggageCheckin} kg, Cabin {f.flight.baggageCabin}kg
                                            </p>
                                            <p className="card-text mb-3">
                                                <strong>Seats:</strong> Total: {f.flight.totalSeats}, First-Class:  {f.flight.firstClassSeats}, Business-Class:  {f.flight.businessClassSeats}
                                            </p>
                                            <p className="card-text">
                                                <strong>Fare:</strong> {f.fare}₹
                                            </p>
                                            <button className="btn btn-outline-primary ">
                                                Edit
                                            </button>
                                            <button className="btn btn-danger  m-2">
                                                Delete
                                            </button>
                                            <button className='btn btn-primary' onClick={<GetBookings />}>View Bookings</button>
                                        </div>
                                    </div>
                                </div>
                            )
                    }


                </div>
            </div>
        </div>
    )
}

export default FlightOwnerDashboard