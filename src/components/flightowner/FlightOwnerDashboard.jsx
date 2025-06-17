import React, { useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const FlightOwnerDashboard = () => {
    const [companyName, setCompanyName] = useState();
    useEffect(() => {
        const getName = async () => {
            try {
                let token = localStorage.getItem('token');
                let details = await axios.get('http://localhost:8080/api/user/getLoggedInUserDetails', {
                    headers: { "Authorization": "Bearer " + token }
                }
                )
                console.log(details)
                let name = details.data.companyName;
                setCompanyName(name);

            } catch (error) {
                console.log(error);
            }
        }
        getName();

    })
    const navigate = useNavigate();
    return (
        <div className="container">
            {/* Header: title + status button */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <h1>Welcome, {companyName}</h1> 
                    <br />
                    <div>
                        <h2 className="fw-bold mb-0">Manage Flights</h2>
                    </div>
                </div>

            </div>


            {/* Action buttons */}
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

    )
}

export default FlightOwnerDashboard