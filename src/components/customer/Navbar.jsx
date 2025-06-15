import React from 'react'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand lg navbar-light bg-light shadow">
            <div className='container'>
                <a className='navbar-brand fw-bold' href='/'>
                    <span>✈️ SkyBooker</span>
                </a>
                <div className='d-flex'>
                    <a href="/bookings" className="btn btn-outline-primary me-2">
                        Bookings
                    </a>
                    <a href="/profile" className="btn btn-primary">
                        Profile
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar