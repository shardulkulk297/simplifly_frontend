import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const OwnerLayout = () => {
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token == null || token == undefined || token == "")
            navigate("/")
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className='container'>
                    <a className='navbar-brand fw-bold' href='/'>
                        <span>✈️ SkyBooker</span>
                    </a>
                    <div className='d-flex'>
                        <a href="/bookings" className="btn btn-outline-primary me-2">
                            Verification Status
                        </a>
                        <a href="/profile" className="btn btn-primary">
                            Profile
                        </a>
                    </div>
                </div>
            </nav>

            {/* This is where child routes (nested under /flightOwner) will render */}
            <div className="container">
                <Outlet />
            </div>
        </>
    );
}

export default OwnerLayout;
