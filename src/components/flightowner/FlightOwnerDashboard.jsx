import React from 'react'
import OwnerLayout from './OwnerLayout'
import { useNavigate } from 'react-router-dom'


const FlightOwnerDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="container py-5">
            {/* Header: title + status button */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="fw-bold mb-0">Manage Flights</h2>
               
            </div>

            {/* Action buttons */}
            <div className="d-grid gap-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <button className="btn btn-outline-primary btn-lg">
                    Schedule New Flight
                </button>
                <button onClick={()=>navigate("/flightOwner/scheduledFlights")} className="btn btn-outline-secondary btn-lg">
                    Manage Existing Schedules
                </button>
                <button className="btn btn-outline-secondary btn-lg">
                    Edit Profile
                </button>
            </div>
        </div>

    )
}

export default FlightOwnerDashboard