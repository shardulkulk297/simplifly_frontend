import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchLoggedInUser } from '../../store/action/UserInfoAction';

const Sidebar = ({ children }) => {
  const { pathname } = useLocation();

  const menuItems = [
    { path: '/flightOwner', icon: '🏠', label: 'Dashboard' },
    { path: '/flightOwner/new-flight', icon: '🛬', label: 'Add Flight' },
    { path: '/flightOwner/new-schedule', icon: '📅', label: 'Schedule Flights' },
    { path: '/flightOwner/scheduledFlights', icon: '✈️', label: 'Scheduled Flights' },
    { path: '/flightOwner/manage-routes', icon: '🗺️', label: 'Manage Routes' },
   
  ];


  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.UserInfo.loggedInUser);
  const navigate = useNavigate();
  const logoutUser = ()=>{
    navigate("/");
    
  }


  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `d-block text-decoration-none px-3 py-2 mx-2 rounded ${isActive(path) ? 'bg-primary text-white' : 'text-dark'
    }`;



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
          {menuItems.map(({ path, icon, label }) => (
            <Link key={path} to={path} className={linkClass(path)}>
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>{icon}</span>
                <span className="fw-medium">{label}</span>
              </div>
            </Link>
          ))}
        </nav>


        <div className="position-absolute bottom-0 p-3 border-top bg-white" style={{ width: '280px' }}>
          <div className="d-flex align-items-center">
            <div
              className="overflow-hidden rounded-circle me-2"
              style={{ width: '70px', height: '40px', background: '#eee' }}
            >
              <img
                src={`/images/${loggedInUser?.logoLink}`}
                alt="User Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
            <div className="flex-grow-1">
              <div className="fw-medium" style={{ fontSize: '14px' }}>Flight Owner</div>
              <small className="text-muted">Logged In</small>
            </div>
            <button onClick={logoutUser} className="btn btn-outline-secondary btn-sm" title="Logout">
              <span style={{ fontSize: '12px' }}>🚪</span>
            </button>
          </div>
        </div>
      </div>


      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;