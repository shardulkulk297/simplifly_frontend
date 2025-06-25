import React, { useState, useEffect } from 'react';

const WeekdaysDropdown = ({ selectedDays = [], setSelectedDays }) => {
    const weekdays = [
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
    ];

    // Ensure selectedDays is always an array
    const safeDays = Array.isArray(selectedDays) ? selectedDays : [];

    const handleDayChange = (day) => {
        // Use case-insensitive comparison to be safe
        const isDaySelected = safeDays.some(d => 
            d.toLowerCase() === day.toLowerCase()
        );
        
        if (isDaySelected) {
            // Remove day if already selected
            const newDays = safeDays.filter(d => 
                d.toLowerCase() !== day.toLowerCase()
            );
            setSelectedDays(newDays);
        } else {
            // Add day if not selected
            setSelectedDays([...safeDays, day]);
        }
    };

    // Helper function to check if day is selected
    const isDayChecked = (day) => {
        return safeDays.some(d => d.toLowerCase() === day.toLowerCase());
    };

    console.log("Selected Days:", selectedDays);

    return (
        <div className="mb-3">
            <label className="form-label">Select Weekdays</label>
            
            {/* Dropdown */}
            <div className="dropdown">
                <button
                    className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {safeDays.length === 0 
                        ? 'Choose weekdays...' 
                        : `${safeDays.length} day(s) selected`
                    }
                </button>
                
                <ul className="dropdown-menu w-100">
                    {weekdays.map((day) => (
                        <li key={day.value}>
                            <div className="dropdown-item">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={day.value}
                                        checked={isDayChecked(day.value)}
                                        onChange={() => handleDayChange(day.value)}
                                    />
                                    <label className="form-check-label" htmlFor={day.value}>
                                        {day.label}
                                    </label>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* Display selected days */}
            {safeDays.length > 0 && (
                <div className="mt-2">
                    <small className="text-muted">Selected: </small>
                    {safeDays.map((day, index) => (
                        <span key={`${day}-${index}`} className="badge bg-primary me-1">
                            {weekdays.find(w => w.value.toLowerCase() === day.toLowerCase())?.label || day}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeekdaysDropdown;