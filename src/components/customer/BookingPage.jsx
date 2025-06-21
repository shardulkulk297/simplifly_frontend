import React, { useState } from 'react';

const BookingPage = () => {
    const [bookingData, setBookingData] = useState({
        schedule: { id: '' },
        noOfTickets: 1,
        passengers: [{ name: '', age: '', gender: 'MALE' }],
        seatNumbers: []
    });
    

    const [selectedSeats, setSelectedSeats] = useState([]);

    const flightInfo = {
        flightNumber: 'IX-1024',
        airline: 'Air India Express',
        route: 'Mumbai → New Delhi',
        departureTime: '18:20',
        arrivalTime: '20:45',
        date: 'Fri, 20 Jun 2025',
        duration: '2h 25m',
        baseFare: 4214,
        taxes: 1008,
        totalPrice: 5222
    };

    const handlePassengerCountChange = (count) => {
        const newPassengers = Array(count).fill(null).map((_, index) =>
            bookingData.passengers[index] || { name: '', age: '', gender: 'MALE' }
        );
        setBookingData({
            ...bookingData,
            noOfTickets: count,
            passengers: newPassengers
        });
    };

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...bookingData.passengers];
        updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
        setBookingData({ ...bookingData, passengers: updatedPassengers });
    };

    const handleSeatSelection = (seatNumber) => {
        const newSelectedSeats = selectedSeats.includes(seatNumber)
            ? selectedSeats.filter(seat => seat !== seatNumber)
            : [...selectedSeats, seatNumber];

        if (newSelectedSeats.length <= bookingData.noOfTickets) {
            setSelectedSeats(newSelectedSeats);
            setBookingData({ ...bookingData, seatNumbers: newSelectedSeats });
        }
    };

    const generateSeatMap = () => {
        const seats = [];
        const rows = 20;
        const seatsPerRow = 6;
        const occupiedSeats = new Set(['1A', '1B', '2C', '3D', '4E', '5F', '7A', '9B', '11C', '13D', '15E']);

        for (let row = 1; row <= rows; row++) {
            const rowSeats = [];
            for (let seat = 0; seat < seatsPerRow; seat++) {
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

    const renderFlightSummary = () => (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="card-title mb-0">Flight Details</h5>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                        <h6 className="text-primary mb-1">{flightInfo.flightNumber}</h6>
                        <small className="text-muted d-block">{flightInfo.airline}</small>
                        <small className="text-muted">Economy</small>
                    </div>
                    <div className="text-end">
                        <h6 className="mb-1">{flightInfo.route}</h6>
                        <small className="text-muted">{flightInfo.date}</small>
                    </div>
                </div>

                <div className="bg-light rounded p-3">
                    <div className="row align-items-center">
                        <div className="col-4 text-center">
                            <h4 className="mb-0">{flightInfo.departureTime}</h4>
                            <small className="fw-bold text-muted">BOM</small>
                            <div><small className="text-muted">Mumbai</small></div>
                        </div>
                        <div className="col-4 text-center">
                            <small className="text-muted d-block mb-2">{flightInfo.duration}</small>
                            <hr className="my-0" style={{position: 'relative'}} />
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%) translateY(-50%)',
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#007bff',
                                borderRadius: '50%',
                                marginTop: '-4px'
                            }}></div>
                            <small className="text-muted mt-2 d-block">Non-stop</small>
                        </div>
                        <div className="col-4 text-center">
                            <h4 className="mb-0">{flightInfo.arrivalTime}</h4>
                            <small className="fw-bold text-muted">DEL</small>
                            <div><small className="text-muted">New Delhi</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPassengerDetails = () => (
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
                        onChange={(e) => handlePassengerCountChange(parseInt(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>

                {bookingData.passengers.map((passenger, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                        <h6 className="mb-3">Passenger {index + 1}</h6>
                        <div className="row g-3">
                            <div className="col-md-8">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter full name"
                                    value={passenger.name}
                                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Age"
                                    value={passenger.age}
                                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Gender</label>
                                <select
                                    className="form-select"
                                    value={passenger.gender}
                                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                                >
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSeatSelection = () => (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="card-title mb-1">Select Seats</h5>
                <small className="text-muted">
                    Selected: {selectedSeats.length} of {bookingData.noOfTickets} seats
                </small>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-center gap-4 mb-4">
                    <div className="d-flex align-items-center gap-2">
                        <div style={{width: '16px', height: '16px', backgroundColor: '#28a745', borderRadius: '2px'}}></div>
                        <small>Available</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <div style={{width: '16px', height: '16px', backgroundColor: '#007bff', borderRadius: '2px'}}></div>
                        <small>Selected</small>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <div style={{width: '16px', height: '16px', backgroundColor: '#6c757d', borderRadius: '2px'}}></div>
                        <small>Occupied</small>
                    </div>
                </div>

                <div className="bg-light rounded p-3">
                    <div className="text-center mb-3">
                        <small className="text-muted">← Front of Aircraft</small>
                    </div>
                    <div style={{maxHeight: '320px', overflowY: 'auto'}}>
                        {generateSeatMap().slice(0, 20).map((row, rowIndex) => (
                            <div key={rowIndex} className="d-flex justify-content-center mb-2">
                                <div className="d-flex align-items-center gap-2">
                                    <div style={{width: '24px'}} className="text-center">
                                        <small className="text-muted">{rowIndex + 1}</small>
                                    </div>
                                    <div className="d-flex gap-1">
                                        {row.slice(0, 3).map(seat => (
                                            <button
                                                key={seat.number}
                                                className={`btn btn-sm ${
                                                    selectedSeats.includes(seat.number)
                                                        ? 'btn-primary'
                                                        : seat.occupied
                                                        ? 'btn-secondary'
                                                        : 'btn-success'
                                                }`}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    padding: '0',
                                                    fontSize: '12px'
                                                }}
                                                onClick={() => !seat.occupied && handleSeatSelection(seat.number)}
                                                disabled={seat.occupied}
                                            >
                                                {seat.number.slice(-1)}
                                            </button>
                                        ))}
                                    </div>
                                    <div style={{width: '32px'}} className="text-center">
                                        <small className="text-muted">aisle</small>
                                    </div>
                                    <div className="d-flex gap-1">
                                        {row.slice(3, 6).map(seat => (
                                            <button
                                                key={seat.number}
                                                className={`btn btn-sm ${
                                                    selectedSeats.includes(seat.number)
                                                        ? 'btn-primary'
                                                        : seat.occupied
                                                        ? 'btn-secondary'
                                                        : 'btn-success'
                                                }`}
                                                style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    padding: '0',
                                                    fontSize: '12px'
                                                }}
                                                onClick={() => !seat.occupied && handleSeatSelection(seat.number)}
                                                disabled={seat.occupied}
                                            >
                                                {seat.number.slice(-1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPriceSummary = () => (
        <div className="card sticky-top" style={{top: '24px'}}>
            <div className="card-header">
                <h5 className="card-title mb-0">Price Summary</h5>
            </div>
            <div className="card-body">
                <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                        <small className="text-muted">Base fare ({bookingData.noOfTickets} traveller{bookingData.noOfTickets > 1 ? 's' : ''})</small>
                        <small className="fw-medium">₹{(flightInfo.baseFare * bookingData.noOfTickets).toLocaleString()}</small>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <small className="text-muted">Taxes and fees</small>
                        <small className="fw-medium">₹{(flightInfo.taxes * bookingData.noOfTickets).toLocaleString()}</small>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <h6 className="mb-0">Total price</h6>
                        <h6 className="mb-0">₹{(flightInfo.totalPrice * bookingData.noOfTickets).toLocaleString()}</h6>
                    </div>
                </div>

                <div className="alert alert-info d-flex align-items-center mb-4" role="alert">
                    <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" 
                         style={{width: '20px', height: '20px', fontSize: '12px'}}>
                        <span className="text-white">i</span>
                    </div>
                    <small>Pay in 3 interest-free EMIs at ₹{Math.round((flightInfo.totalPrice * bookingData.noOfTickets) / 3).toLocaleString()}/mo</small>
                </div>

                <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                        console.log('Booking Data:', bookingData);
                        alert('Booking submitted! Check console for data.');
                    }}
                >
                    Continue to Payment
                </button>
            </div>
        </div>
    );

    return (
        <>
            <link 
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
                rel="stylesheet"
            />
            <div className="bg-light min-vh-100">
                <div className="container py-4">
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="mb-4">
                                <h2 className="mb-3">Complete your booking</h2>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="d-flex align-items-center gap-2 bg-primary text-white px-3 py-2 rounded-pill">
                                        <span className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center" 
                                              style={{width: '20px', height: '20px', fontSize: '12px'}}>1</span>
                                        <small className="fw-medium">Review & Book</small>
                                    </div>
                                    <div style={{width: '32px', height: '1px', backgroundColor: '#dee2e6'}}></div>
                                    <div className="d-flex align-items-center gap-2 bg-light text-muted px-3 py-2 rounded-pill border">
                                        <span className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" 
                                              style={{width: '20px', height: '20px', fontSize: '12px'}}>2</span>
                                        <small>Payment</small>
                                    </div>
                                </div>
                            </div>

                            {renderFlightSummary()}
                            {renderPassengerDetails()}
                            {renderSeatSelection()}
                        </div>

                        <div className="col-lg-4">
                            {renderPriceSummary()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingPage;