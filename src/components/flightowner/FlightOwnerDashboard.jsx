import React, { use, useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { fetchLoggedInUser } from '../../store/action/UserInfoAction';
import { useDispatch, useSelector } from 'react-redux';
const FlightOwnerDashboard = () => {
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state=>state.UserInfo.loggedInUser)
    useEffect(() => {
        const getName = async () => {     
            fetchLoggedInUser(dispatch)
        }
        getName();

    })
    const navigate = useNavigate();
    return (
        <div className="container py-5">
            {/* Header: title + status button */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1>Welcome, {loggedInUser.companyName}🧑‍✈️</h1>
                    <br />
                    <div>
                        <h2 className="fw-bold mb-0">Manage your Flights🌍</h2>
                    </div>
                </div>

            </div>


            {/* Action buttons */}
            <div className='d-flex justify-content-center align-items-center'>
                <div className='card' style={{ width: '25rem', padding: '3rem' }}>
                    <div className="d-grid gap-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <Link to={"/flightOwner/new-schedule"} className="btn btn-outline-primary btn-lg">
                            Schedule New Flight
                        </Link>
                        <Link to={"/flightOwner/scheduledFlights"} className="btn btn-primary btn-lg">
                            Manage Existing Schedules
                        </Link>
                        <button className="btn btn-outline-secondary btn-lg">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FlightOwnerDashboard