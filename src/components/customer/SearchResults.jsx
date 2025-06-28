import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { searchFlights } from '../../store/action/FlightAction';
import toast from 'react-hot-toast';
import axios from 'axios';

const SearchResults = () => {

    const navigate = useNavigate()
    const returnFlights = [];
    const trip = "one-way"
    const [flights, setFlights] = useState([]);
    const [page, setPage] = useState(0);
    const [isNextPage, setIsNextPage] = useState(true);
    const size = 7;
    const location = useLocation();
    const dispatch = useDispatch();
    const { origin, destination, date } = location.state || {};
    const searchOrigin = origin || localStorage.getItem('searchOrigin');
    const searchDestination = destination || localStorage.getItem('searchDestination');
    const searchDate = date || localStorage.getItem('searchDate');
    if (origin && destination && date) {
        localStorage.setItem('searchOrigin', origin);
        localStorage.setItem('searchDestination', destination);
        localStorage.setItem('searchDate', date);
    }
    console.log(searchOrigin, searchDate, searchDestination);


    //Filter Price
    const [visibleFlights, setVisibleFlights] = useState([]);
    const [filterPrice, setFilterprice] = useState(null);
    const [filterTime, setFilterTime] = useState(null);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [filterCompany, setFilterCompany] = useState(null);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const handlePriceChange = (e) => {
        setFilterprice(Number(e.target.value));
    }

    //Filter useEffect will get triggered whenever a new filter is applied
    useEffect(() => {
        let filtered = flights;

        filtered = filtered.filter(
            f => f.fare <= filterPrice
        );

        if (filterTime === "morning") {
            filtered = filtered.filter((f) => {
                const hours = new Date(f.departureTime).getHours();
                return hours >= 6 && hours <= 12
            })
        }

        if (filterTime === "afternoon") {
            filtered = filtered.filter((f) => {
                const hours = new Date(f.departureTime).getHours();
                return hours >= 12 && hours <= 18
            })

        }

        if (filterTime === "evening") {
            filtered = filtered.filter((f) => {
                const hours = new Date(f.departureTime).getHours();
                return hours >= 18 && hours <= 24
            })
        }
        if (filterCompany === "FlyIndia") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "FlyIndia");
        }
        if (filterCompany === "Indigo") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "Indigo");
        }
        if (filterCompany === "Gofirst") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "Gofirst");
        }
        if (filterCompany === "Spicejet") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "Spicejet");
        }
        if (filterCompany === "Akasa") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "Akasa");
        }
        if (filterCompany === "Going") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "Going");
        }
        if (filterCompany === "GoAir Flights") {
            filtered = filtered.filter((f) => f.flight.owner.companyName === "GoAir Flights");
        }

        setVisibleFlights(filtered);
    }, [flights, filterPrice, filterTime, filterCompany])

    useEffect(() => {
        const fetchFlights = async () => {
            if (searchOrigin && searchDestination && searchDate) {
                try {
                    const filtersAppliedd =
                        filterTime !== "" ||
                        filterCompany !== "" ||
                        filterPrice > 0;
                    setFiltersApplied(filtersAppliedd);
                    const response = await axios.get(`http://localhost:8080/api/flight/schedule/search`, {
                        params: {
                            origin: searchOrigin,
                            destination: searchDestination,
                            date: searchDate,
                            page: page,
                            size: size
                        }
                    });
                    console.log(response.data);
                    setFlights(response.data);
                    setIsNextPage(response.data.length === size);
                    const fares = response.data.map((f) => f.fare);
                    const min = Math.min(...fares);
                    const max = Math.max(...fares);
                    setMin(min);
                    setMax(max);
                    setFilterprice(max);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchFlights();
    }, [page])



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

    const bookFlights = (scheduleId) => {
        navigate("/customer/book", { state: { scheduleId: scheduleId } })
    }

    return (
        <div className='container-fluid py-4'>
            <div className="row">

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
                                <input
                                    min={min}
                                    max={max}
                                    step={100}
                                    onChange={handlePriceChange}
                                    type="range" className="form-range" />
                                <div className="d-flex justify-content-between small text-muted">
                                    <div>Showing flights ≤ ₹{filterPrice}</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small text-muted">Departure Time</label>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        checked={filterTime === "morning"}
                                        type="checkbox"
                                        onChange={() => setFilterTime(filterTime === "morning" ? "" : "morning")}
                                    />
                                    <label className="form-check-label small">Morning (6AM - 12PM)</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        checked={filterTime === "afternoon"}
                                        onChange={() => setFilterTime(filterTime === "afternoon" ? "" : "afternoon")}
                                        type="checkbox" />
                                    <label className="form-check-label small">Afternoon (12PM - 6PM)</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        checked={filterTime === "evening"}
                                        onChange={() => setFilterTime(filterTime === "evening" ? "" : "evening")}
                                        type="checkbox" />
                                    <label className="form-check-label small">Evening (6PM - 12AM)</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small text-muted me-2">Airlines</label>
                                <div className="form-check">
                                    <label htmlFor="">FlyIndia</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "FlyIndia"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "FlyIndia" ? "" : "FlyIndia")}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="">Indigo</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "Indigo"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "Indigo" ? "" : "Indigo")}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="">Gofirst</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "Gofirst"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "Gofirst" ? "" : "Gofirst")}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="">Spicejet</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "Spicejet"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "Spicejet" ? "" : "Spicejet")}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="">Akasa</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "Akasa"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "Akasa" ? "" : "Akasa")}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="">Going</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "Going"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "Going" ? "" : "Going")}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="">GoAir Flights</label>
                                    <input
                                        className="form-check-input"
                                        checked={filterCompany === "GoAir Flights"}
                                        type="checkbox"
                                        onChange={() => setFilterCompany(filterCompany === "GoAir Flights" ? "" : "GoAir Flights")}
                                    />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-lg-9 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0">
                            <i className="fas fa-plane me-2 text-primary"></i>
                            {trip === "Round" ? `Available Flights (${flights.length}) & Return Flights (${returnFlights.length})` : `Available Flights (${flights.length}) `}
                        </h4>

                    </div>


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
                                {visibleFlights.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className='text-center align-middle'>
                                            No flights for this filter on this page
                                        </td>
                                    </tr>
                                )}
                                {visibleFlights.length !== 0 && visibleFlights.map((f, index) => {
                                    const departure = formatDateTime(f.departureTime);
                                    const arrival = formatDateTime(f.arrivalTime);

                                    return (
                                        <React.Fragment key={f.id}>
                                            <tr className="align-middle">
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
                                                    <button onClick={() => bookFlights(f.id)} className="btn btn-primary btn-sm px-3">
                                                        Book
                                                    </button>
                                                    <button className="btn btn-outline-secondary btn-sm ms-1" data-bs-toggle="collapse" data-bs-target={`#details-${index}`}>
                                                        <i className="fas fa-info-circle">View Details</i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="collapse" id={`details-${index}`}>
                                                <td colSpan="8">
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
                                                </td>
                                            </tr>
                                        </React.Fragment>

                                    );
                                })

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

                                    )}
                            </tbody>
                        </table>


                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <button
                                        disabled={isNextPage}
                                        className="page-link"
                                        onClick={() => setPage(page - 1)}
                                    >
                                        Previous
                                    </button>
                                </li>

                                <li className="page-item">
                                    <button
                                        disabled={!isNextPage}
                                        className="page-link"
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* Expandable Details Rows */}
                    {/* {flights.length > 0 && flights.map((f, index) => (
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
                    ))} */}
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