import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const { pathname } = useLocation();

  const isActive = (path) => 
    pathname === path;

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 76px)' }}>

      <div className="bg-light border-end position-relative" style={{ width: '280px', minHeight: 'calc(100vh - 76px)' }}>
   
        <div className="p-3 border-bottom">
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" 
                 style={{ width: '40px', height: '40px' }}>
              <span className="text-white fw-bold">FO</span>
            </div>
            <div>
              <h6 className="mb-0 fw-bold">Flight Owner</h6>
              <small className="text-muted">Management Portal</small>
            </div>
          </div>
        </div>

        
        <nav className="py-2">
          <div>
            <Link
              to="/flightOwner"
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive('/flightOwner/dashboard') ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>🏠</span>
                <span className="fw-medium">Dashboard</span>
              </div>
            </Link>
          </div>

          <div>
            <Link
              to="/flightOwner/new-schedule"
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive('/flightOwner/new-schedule') ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>📅</span>
                <span className="fw-medium">Schedule Flights</span>
              </div>
            </Link>
          </div>

          <div>
            <Link
              to="/flightOwner/scheduledFlights"
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive('/flightOwner/scheduledFlights') ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>✈️</span>
                <span className="fw-medium">Scheduled Flights</span>
              </div>
            </Link>
          </div>

          <div>
            <Link
              to="/flightOwner/manage-routes"
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive('/flightOwner/manage-routes') ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>🗺️</span>
                <span className="fw-medium">Manage Routes</span>
              </div>
            </Link>
          </div>

          <div>
            <Link
              to="/flightOwner/reports"
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive('/flightOwner/reports') ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>📊</span>
                <span className="fw-medium">Reports</span>
              </div>
            </Link>
          </div>
           <div>
            <Link
              to="/flightOwner/get-bookings"
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive('/flightOwner/get-bookings') ? 'bg-primary text-white' : 'text-dark'}`}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>🎫</span>
                <span className="fw-medium">Bookings</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="position-absolute bottom-0 p-3 border-top bg-white" style={{ width: '280px' }}>
          <div className="d-flex align-items-center">
            <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center me-2" 
                 style={{ width: '32px', height: '32px' }}>
              <span className="text-white" style={{ fontSize: '14px' }}>👤</span>
            </div>
            <div className="flex-grow-1">
              <div className="fw-medium" style={{ fontSize: '14px' }}>Flight Owner</div>
              <small className="text-muted">Logged In</small>
            </div>
            <button className="btn btn-outline-secondary btn-sm" title="Logout">
              <span style={{ fontSize: '12px' }}>🚪</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
