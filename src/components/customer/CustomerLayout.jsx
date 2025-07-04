import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

const CustomerLayout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token == null || token == undefined || token == "")
            navigate("/")
    }, []);
    const logout = ()=>{
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className='container'>
                    <a className='navbar-brand fw-bold' href='/'>
                        <span>✈️ SkyBooker</span>
                    </a>
                    <div className='d-flex'>
                        <Link to="/customer/bookings" className="btn btn-outline-primary me-2">
                            My Bookings
                        </Link>
                        <button onClick={()=>logout()} className="btn btn-primary">
                            Logout
                        </button>
                    </div>
                    
                </div>
                
            </nav>
            {/* This is where child routes (nested under /flightOwner) will render */}
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default CustomerLayout