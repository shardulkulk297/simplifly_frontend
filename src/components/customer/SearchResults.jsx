import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchResults = () => {

    const { state } = useLocation();

    if (!state || !Array.isArray(state.flights)) {
        navigate('/customer/search', { replace: true });
        return null;
    }

    const navigate = useNavigate()

    const { flights, returnFlights = [], trip } = state || {};

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const dateOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        return {
            date: date.toLocaleDateString('en-US', dateOptions),
            time: date.toLocaleTimeString('en-US', timeOptions)
        };
    };

    if (flights.length === 0 && (trip === "Round" ? returnFlights.length === 0 : true)) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center">
                    No {trip === "Round" ? "outbound or return" : "flights"} available.
                </div>
            </div>
        );
    }

    const bookFlights = (scheduleId) =>{
        
        navigate("/customer/book", {state: {scheduleId: scheduleId}})
    
    }

    return (
        <div className='container-fluid py-4'>
            <div className="row">
                {/* Left Sidebar for Filters */}
                <div className="col-lg-3 col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light">
                            <h6 className="mb-0">
                                <i className="fas fa-filter me-2"></i>
                                Filters
                            </h6>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label small text-muted">Price Range</label>
                                <input type="range" className="form-range" />
                                <div className="d-flex justify-content-between small text-muted">
                                    <span>₹500</span>
                                    <span>₹5000</span>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small text-muted">Departure Time</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label small">Morning (6AM - 12PM)</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label small">Afternoon (12PM - 6PM)</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label small">Evening (6PM - 12AM)</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small text-muted">Airlines</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label small">All Airlines</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="col-lg-9 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0">
                            <i className="fas fa-plane me-2 text-primary"></i>
                            {trip === "Round" ? `Available Flights (${flights.length}) & Return Flights (${returnFlights.length})` : `Available Flights (${flights.length}) `}
                        </h4>
                        <div className="dropdown">
                            <button className="btn btn-outline-secondary dropdown-toggle btn-sm" type="button" data-bs-toggle="dropdown">
                                Sort by: Price
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Price (Low to High)</a></li>
                                <li><a className="dropdown-item" href="#">Price (High to Low)</a></li>
                                <li><a className="dropdown-item" href="#">Duration</a></li>
                                <li><a className="dropdown-item" href="#">Departure Time</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Flight Results Table */}
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Flight</th>
                                    <th>Origin</th>
                                    <th>Destination</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Duration</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {flights.length !== 0 ? flights.map((f, index) => {
                                    const departure = formatDateTime(f.departureTime);
                                    const arrival = formatDateTime(f.arrivalTime);

                                    return (

                                        <tr key={index} className="align-middle">
                                            <td>
                                                <div className="fw-bold text-primary">{f.flight.owner.companyName} {f.flight.flightNumber}</div>
                                                <small className="text-muted">
                                                    {f.flight.totalSeats} seats |
                                                    {f.flight.baggageCheckin}kg check-in
                                                </small>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <span className="badge bg-secondary me-2">{f.flight.route.origin}</span>
                                                    <i className="fas fa-arrow-right text-muted mx-1"></i>
                                                    
                                                </div>
                                            </td> 
                                            <td>
                                                 <div className="d-flex align-items-center">
                                                    <span className="badge bg-secondary ms-2">{f.flight.route.destination}</span>
                                                    <i className="fas fa-arrow-right text-muted mx-1"></i>
                                                </div>
                                                
                                            </td>
                                            <td>
                                                <div className="fw-bold">{departure.time}</div>
                                                <small className="text-muted">{departure.date}</small>
                                            </td>
                                            <td>
                                                <div className="fw-bold">{arrival.time}</div>
                                                <small className="text-muted">{arrival.date}</small>
                                            </td>
                                            <td>
                                                <span className="badge bg-info text-dark">{f.flight.route.duration}</span>
                                            </td>
                                            <td>
                                                <div className="fw-bold text-success fs-5">₹{f.fare.toLocaleString()}</div>
                                                <small className="text-muted">per person</small>
                                            </td>
                                            <td>
                                                <button onClick={()=> bookFlights(f.id)} className="btn btn-primary btn-sm px-3">
                                                    Book
                                                </button>
                                                <button className="btn btn-outline-secondary btn-sm ms-1" data-bs-toggle="collapse" data-bs-target={`#details-${index}`}>
                                                    <i className="fas fa-info-circle">View Details</i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : <div className='container py-5'>
                                    <div className='card card-body bg-danger text-center'>
                                        <h5>No Flights Available for this route</h5>
                                    </div>
                                </div>
                                }
                                {trip == "Round" &&
                                    (
                                        <>
                                            <tr>
                                                <td colSpan="7" className="bg-light text-center py-2">
                                                    <h5 className="mb-0 text-primary">Return Flights</h5>
                                                </td>
                                            </tr>
                                            {returnFlights.length > 0 ?
                                                returnFlights.map((f, index) => {
                                                    const departure = formatDateTime(f.departureTime);
                                                    const arrival = formatDateTime(f.arrivalTime);

                                                    return (
                                                        <tr key={index} className="align-middle">
                                                            <td>
                                                                <div className="fw-bold text-primary">{f.flight.owner.companyName} {f.flight.flightNumber}</div>
                                                                <small className="text-muted">
                                                                    {f.flight.totalSeats} seats |
                                                                    {f.flight.baggageCheckin}kg check-in
                                                                </small>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <span className="badge bg-secondary me-2">{f.flight.route.origin}</span>
                                                                    <i className="fas fa-arrow-right text-muted mx-1"></i>
                                                                    <span className="badge bg-secondary ms-2">{f.flight.route.destination}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="fw-bold">{departure.time}</div>
                                                                <small className="text-muted">{departure.date}</small>
                                                            </td>
                                                            <td>
                                                                <div className="fw-bold">{arrival.time}</div>
                                                                <small className="text-muted">{arrival.date}</small>
                                                            </td>
                                                            <td>
                                                                <span className="badge bg-info text-dark">{f.flight.route.duration}</span>
                                                            </td>
                                                            <td>
                                                                <div className="fw-bold text-success fs-5">₹{f.fare.toLocaleString()}</div>
                                                                <small className="text-muted">per person</small>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-primary btn-sm px-3">
                                                                    Book
                                                                </button>
                                                                <button className="btn btn-outline-secondary btn-sm ms-1" data-bs-toggle="collapse" data-bs-target={`#details-${index}`}>
                                                                    <i className="fas fa-info-circle">View Details</i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center py-4">
                                                            <div className="alert alert-warning mb-0">
                                                                No return flights available for this route
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </>
                                        /* render your return‐flights table here */
                                    )}
                            </tbody>
                        </table>
                    </div>
                    {/* Expandable Details Rows */}
                    {flights.length> 0 && flights.map((f, index) => (
                        <div key={`details-${index}`} className="collapse" id={`details-${index}`}>
                            <div className="card card-body bg-light mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="text-muted">Baggage Allowance</h6>
                                        <ul className="list-unstyled small">
                                            <li>Check-in: <strong>{f.flight.baggageCheckin} kg</strong></li>
                                            <li>Cabin: <strong>{f.flight.baggageCabin} kg</strong></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 className="text-muted">Seat Information</h6>
                                        <ul className="list-unstyled small">
                                            <li>Total Seats: <strong>{f.flight.totalSeats}</strong></li>
                                            <li>First Class: <strong>{f.flight.firstClassSeats}</strong></li>
                                            <li>Business Class: <strong>{f.flight.businessClassSeats}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {trip == "round" > 0 && returnFlights.length > 0 && (
                        <div>
                            {returnFlights.map((f, index) => (
                                <div key={`details-${index}`} className="collapse" id={`details-${index}`}>
                                    <div className="card card-body bg-light mb-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="text-muted">Baggage Allowance</h6>
                                                <ul className="list-unstyled small">
                                                    <li>Check-in: <strong>{f.flight.baggageCheckin} kg</strong></li>
                                                    <li>Cabin: <strong>{f.flight.baggageCabin} kg</strong></li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="text-muted">Seat Information</h6>
                                                <ul className="list-unstyled small">
                                                    <li>Total Seats: <strong>{f.flight.totalSeats}</strong></li>
                                                    <li>First Class: <strong>{f.flight.firstClassSeats}</strong></li>
                                                    <li>Business Class: <strong>{f.flight.businessClassSeats}</strong></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        /* render your return‐flights table here */
                    )}

                </div>
            </div>
        </div>
    )
}

export default SearchResults