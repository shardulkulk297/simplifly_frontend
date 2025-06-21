import React, { useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { fetchLoggedInUser } from '../../store/action/UserInfoAction';
import { useDispatch, useSelector } from 'react-redux';

const FlightOwnerDashboard = () => {
    const [companyName, setCompanyName] = useState();
    const [dashboardStats, setDashboardStats] = useState({
        totalScheduledFlights: 42,
        totalFlights: 156,
        averageBookings: 78
    });
    
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.UserInfo.loggedInUser)
    
    useEffect(() => {
        const getName = async () => {
            fetchLoggedInUser(dispatch)
        }
        getName();
    }, [])
    
    const navigate = useNavigate();
    
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
                            <h3 className="fw-bold text-primary">{dashboardStats.totalScheduledFlights}</h3>
                            <p className="text-muted mb-0">Scheduled Flights</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="fw-bold text-primary">{dashboardStats.totalFlights}</h3>
                            <p className="text-muted mb-0">Total Flights</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body text-center">
                            <h3 className="fw-bold text-primary">{dashboardStats.averageBookings}%</h3>
                            <p className="text-muted mb-0">Average Bookings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center">
                <div className="card border-0 shadow-sm p-4" style={{ maxWidth: '20rem', width: '100%', padding: '25rem' }}>
                    <div className="d-grid gap-3">
                        <Link to="/flightOwner/new-schedule" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-plus-circle"></i> Schedule New Flight
                        </Link>
                        <Link to="/flightOwner/scheduledFlights" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-airplane"></i> Manage Schedules
                        </Link>
                        <Link to="/flightOwner/manage-routes" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-geo-alt"></i> Manage Routes
                        </Link>
                        <button className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                            <i className="bi bi-person-gear"></i> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightOwnerDashboard