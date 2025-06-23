import React, { useState } from 'react';

const WeekdaysDropdown = () => {
    const [selectedDays, setSelectedDays] = useState([]);
    
    const weekdays = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursday' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }
    ];

    const handleDayChange = (day) => {
        if (selectedDays.includes(day)) {
            // Remove day if already selected
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            // Add day if not selected
            setSelectedDays([...selectedDays, day]);
        }
    };

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
                    {selectedDays.length === 0 
                        ? 'Choose weekdays...' 
                        : `${selectedDays.length} day(s) selected`
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
                                        checked={selectedDays.includes(day.value)}
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
            {selectedDays.length > 0 && (
                <div className="mt-2">
                    <small className="text-muted">Selected: </small>
                    {selectedDays.map((day, index) => (
                        <span key={day} className="badge bg-primary me-1">
                            {weekdays.find(w => w.value === day)?.label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeekdaysDropdown;