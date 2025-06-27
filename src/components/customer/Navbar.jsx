import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {

   
    return (
        <nav className="navbar navbar-expand lg navbar-light bg-light shadow">
            <div className='container'>
                <Link className='navbar-brand fw-bold' to='/'>
                    <span>✈️ SkyBooker</span>
                </Link>
                <div className='d-flex'>
                    <Link to="customer/bookings" className="btn btn-outline-primary me-2">
                        Bookings
                    </Link>
                    <Link to="customer/profile" className="btn btn-primary">
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar