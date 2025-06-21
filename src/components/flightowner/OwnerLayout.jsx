import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const OwnerLayout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token == null || token == undefined || token == "")
            navigate("/")
    }, [navigate]);

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

            <Sidebar>
                <div className="p-4">
                    <Outlet />
                </div>
            </Sidebar>
        </>
    );
}

export default OwnerLayout;