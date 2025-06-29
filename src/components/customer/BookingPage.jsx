import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSchedule } from '../../store/action/ScheduleAction';
import { useDispatch, useSelector } from 'react-redux';

import FlightSummary from './FlightSummary';
import BookingHeader from './BookingHeader';

const BookingPage = () => {


    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const scheduleId = location.state.scheduleId;
    const schedule = useSelector(state => state.schedules.schedules);
    const [seatNumbers, setSeatNumbers] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [bookingData, setBookingData] = useState({
        schedule: schedule,
        noOfTickets: 1,
        passengers: [{
            name: '',
            age: '',
            gender: 'MALE'
        }],
        seatNumbers: seatNumbers,
        paymentMethod: ""
    });

    // Fetch schedule data (keeping as requested)
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                await getSchedule(dispatch)(scheduleId);
                setLoading(false);
            } catch (error) {
                console.log(error);
                const errMsg = error.response?.data?.message || 'Something went wrong'
                toast.error(errMsg);
            }
        }
        fetchSchedule();
    }, [])

    // Utility functions
    const formatDateTime = (dateTimeStr) => {
        const options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
        };
        return new Date(dateTimeStr).toLocaleString(undefined, options);
    }

    const formatTime = (isoDateTime) => {
        return new Date(isoDateTime).toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit'
        });
    }

    const handlePassengerChange = (index, field)=> e=>{
        const value = e.target.value;
        setBookingData(prev=> {
            const passengers = [...prev.passengers];
            passengers[index] = {...passengers[index], [field]: value}
            console.log(passengers);
            return {...prev, passengers}
        })
        console.log(bookingData);
    }



    const handleSeatSelection = (seatNumber) => {
        const isSelected = selectedSeats.includes(seatNumber);
        let newSelectedSeats;

        if (isSelected) {
            newSelectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        } else if (selectedSeats.length < bookingData.noOfTickets) {
            newSelectedSeats = [...selectedSeats, seatNumber];
        } else {
            return; // Max seats already selected
        }

        setSelectedSeats(newSelectedSeats);
        setBookingData(prev => ({ ...prev, seatNumbers: newSelectedSeats }));
    };

    const handleBookingSubmit = () => {
        console.log('Booking Data:', bookingData);
        alert('Booking submitted! Check console for data.');
    };

    // Loading state
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">
                <BookingHeader />

                <div className="row g-4">
                    <div className="col-lg-8">

                        {/* Flight Summary */}
                        <FlightSummary schedule={schedule} formatDateTime={formatDateTime} formatTime={formatTime} />
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Passenger Details</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <label className="form-label">Number of Passengers</label>
                                    <select
                                        className="form-select"
                                        value={bookingData.noOfTickets}
                                        onChange={(e) => onPassengerCountChange(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Passenger Form */}
                                {
                                    bookingData.passengers.map((p, index) => (
                                        <div className="border rounded p-3 mb-3">
                                            <h6 className="mb-3">Passenger {index + 1}</h6>
                                            <div className="row g-3">
                                                <div className="col-md-8">
                                                    <label className="form-label">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter full name"
                                                        onChange={handlePassengerChange(index, "name")}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="form-label">Age</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Age"
                                                        onChange={handlePassengerChange(index, "age")}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="form-label">Gender</label>
                                                    <select
                                                        className="form-select"
                                                        onChange={handlePassengerChange(index, "gender")}
                                                    >
                                                        <option value="MALE">Male</option>
                                                        <option value="FEMALE">Female</option>
                                                        <option value="OTHER">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }
                               

                            </div>
                        </div>

                    </div>

                    <div className="col-lg-4">

                        price summary

                    </div>
                </div>
            </div>
        </div>
    );
};





// Passenger information form

// Individual passenger form
const PassengerForm = ({ passenger, index, onPassengerChange }) => (
    <div className="border rounded p-3 mb-3">
        <h6 className="mb-3">Passenger {index + 1}</h6>
        <div className="row g-3">
            <div className="col-md-8">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    value={passenger.name}
                    onChange={(e) => onPassengerChange(index, 'name', e.target.value)}
                />
            </div>
            <div className="col-md-2">
                <label className="form-label">Age</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    value={passenger.age}
                    onChange={(e) => onPassengerChange(index, 'age', e.target.value)}
                />
            </div>
            <div className="col-md-2">
                <label className="form-label">Gender</label>
                <select
                    className="form-select"
                    value={passenger.gender}
                    onChange={(e) => onPassengerChange(index, 'gender', e.target.value)}
                >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
        </div>
    </div>
);

// Seat selection component
const SeatSelection = ({ selectedSeats, maxSeats, onSeatSelect }) => {
    const generateSeatMap = () => {
        const seats = [];
        const occupiedSeats = new Set(['1A', '1B', '2C', '3D', '4E', '5F', '7A', '9B', '11C', '13D', '15E']);

        for (let row = 1; row <= 20; row++) {
            const rowSeats = [];
            for (let seat = 0; seat < 6; seat++) {
                const seatLetter = String.fromCharCode(65 + seat);
                const seatNumber = `${row}${seatLetter}`;
                rowSeats.push({
                    number: seatNumber,
                    occupied: occupiedSeats.has(seatNumber)
                });
            }
            seats.push(rowSeats);
        }
        return seats;
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="card-title mb-1">Select Seats</h5>
                <small className="text-muted">
                    Selected: {selectedSeats.length} of {maxSeats} seats
                </small>
            </div>
            <div className="card-body">
                <SeatLegend />
                <SeatMap
                    seatMap={generateSeatMap()}
                    selectedSeats={selectedSeats}
                    onSeatSelect={onSeatSelect}
                />
            </div>
        </div>
    );
};

// Seat selection legend
const SeatLegend = () => (
    <div className="d-flex justify-content-center gap-4 mb-4">
        <div className="d-flex align-items-center gap-2">
            <div style={{ width: '16px', height: '16px', backgroundColor: '#28a745', borderRadius: '2px' }}></div>
            <small>Available</small>
        </div>
        <div className="d-flex align-items-center gap-2">
            <div style={{ width: '16px', height: '16px', backgroundColor: '#007bff', borderRadius: '2px' }}></div>
            <small>Selected</small>
        </div>
        <div className="d-flex align-items-center gap-2">
            <div style={{ width: '16px', height: '16px', backgroundColor: '#6c757d', borderRadius: '2px' }}></div>
            <small>Occupied</small>
        </div>
    </div>
);

// Seat map grid
const SeatMap = ({ seatMap, selectedSeats, onSeatSelect }) => (
    <div className="bg-light rounded p-3">
        <div className="text-center mb-3">
            <small className="text-muted">← Front of Aircraft</small>
        </div>
        <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
            {seatMap.map((row, rowIndex) => (
                <SeatRow
                    key={rowIndex}
                    row={row}
                    rowNumber={rowIndex + 1}
                    selectedSeats={selectedSeats}
                    onSeatSelect={onSeatSelect}
                />
            ))}
        </div>
    </div>
);

// Individual seat row
const SeatRow = ({ row, rowNumber, selectedSeats, onSeatSelect }) => (
    <div className="d-flex justify-content-center mb-2">
        <div className="d-flex align-items-center gap-2">
            <div style={{ width: '24px' }} className="text-center">
                <small className="text-muted">{rowNumber}</small>
            </div>

            {/* Left side seats (A, B, C) */}
            <div className="d-flex gap-1">
                {row.slice(0, 3).map(seat => (
                    <SeatButton
                        key={seat.number}
                        seat={seat}
                        isSelected={selectedSeats.includes(seat.number)}
                        onSeatSelect={onSeatSelect}
                    />
                ))}
            </div>

            <div style={{ width: '32px' }} className="text-center">
                <small className="text-muted">aisle</small>
            </div>

            {/* Right side seats (D, E, F) */}
            <div className="d-flex gap-1">
                {row.slice(3, 6).map(seat => (
                    <SeatButton
                        key={seat.number}
                        seat={seat}
                        isSelected={selectedSeats.includes(seat.number)}
                        onSeatSelect={onSeatSelect}
                    />
                ))}
            </div>
        </div>
    </div>
);

// Individual seat button
const SeatButton = ({ seat, isSelected, onSeatSelect }) => {
    const getSeatClass = () => {
        if (isSelected) return 'btn-primary';
        if (seat.occupied) return 'btn-secondary';
        return 'btn-success';
    };

    return (
        <button
            className={`btn btn-sm ${getSeatClass()}`}
            style={{ width: '32px', height: '32px', padding: '0', fontSize: '12px' }}
            onClick={() => !seat.occupied && onSeatSelect(seat.number)}
            disabled={seat.occupied}
        >
            {seat.number.slice(-1)}
        </button>
    );
};

// Price summary and booking
const PriceSummary = ({ ticketCount, onBookingSubmit }) => {
    const baseFare = 4214;
    const taxes = 1008;
    const totalPrice = baseFare + taxes;

    return (
        <div className="card sticky-top" style={{ top: '24px' }}>
            <div className="card-header">
                <h5 className="card-title mb-0">Price Summary</h5>
            </div>
            <div className="card-body">
                <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">
                            Base fare ({ticketCount} traveller{ticketCount > 1 ? 's' : ''})
                        </small>
                        <small className="fw-medium">₹{(baseFare * ticketCount).toLocaleString()}</small>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <small className="text-muted">Taxes and fees</small>
                        <small className="fw-medium">₹{(taxes * ticketCount).toLocaleString()}</small>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h6 className="mb-0">Total price</h6>
                        <h6 className="mb-0">₹{(totalPrice * ticketCount).toLocaleString()}</h6>
                    </div>
                </div>

                <div className="alert alert-info d-flex align-items-center mb-4" role="alert">
                    <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                        style={{ width: '20px', height: '20px', fontSize: '12px' }}>
                        <span className="text-white">i</span>
                    </div>
                    <small>
                        Pay in 3 interest-free EMIs at ₹{Math.round((totalPrice * ticketCount) / 3).toLocaleString()}/mo
                    </small>
                </div>

                <button className="btn btn-primary w-100" onClick={onBookingSubmit}>
                    Continue to Payment
                </button>
            </div>
        </div>
    );
};

export default BookingPage;