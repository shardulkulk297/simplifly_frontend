import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const location = useLocation();
  
  const menuItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', path: '/flightOwner/dashboard' },
    { id: 'schedule', icon: '📅', label: 'Schedule Flights', path: '/flightOwner/new-schedule' },
    { id: 'scheduled', icon: '✈️', label: 'Scheduled Flights', path: '/flightOwner/scheduledFlights' },
    { id: 'routes', icon: '🗺️', label: 'Manage Routes', path: '/flightOwner/manage-routes' },
    { id: 'reports', icon: '📊', label: 'Reports', path: '/flightOwner/reports' },
    { id: 'settings', icon: '🔧', label: 'Settings', path: '/flightOwner/settings' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 76px)' }}>
      {/* Sidebar */}
      <div className="bg-light border-end" style={{ width: '280px', minHeight: 'calc(100vh - 76px)' }}>
        {/* Header */}
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

        {/* Navigation Menu */}
        <nav className="py-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`d-block text-decoration-none px-3 py-2 mx-2 rounded ${
                isActive(item.path)
                  ? 'bg-primary text-white' 
                  : 'text-dark'
              }`}
              style={{
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.backgroundColor = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div className="d-flex align-items-center">
                <span className="me-3" style={{ fontSize: '18px' }}>{item.icon}</span>
                <span className="fw-medium">{item.label}</span>
              </div>
            </Link>
          ))}
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