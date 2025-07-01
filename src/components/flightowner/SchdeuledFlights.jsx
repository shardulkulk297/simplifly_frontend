import React, { useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchAllFlights, getOwnerFlights } from '../../store/action/FlightAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import "../../assets/css/flight.css"
import { getAllSchedules } from '../../store/action/ScheduleAction';
const SchdeuledFlights = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [editSchedule, setEditSchedule] = useState(null);
    const flights = useSelector(state => state.schedules.schedules);
    const iFlights = useSelector(state => state.allFlights.flights);
    const [searchedFlights, setSearchedFlights] = useState([]);

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [searching, setSearching] = useState(false);


    //Delete function
    const handleDelete = async (scheduleId) => {
        try {

            const response = await axios.delete(`http://localhost:8080/api/flight/schedule/delete/${scheduleId}`,
                {

                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                });
            console.log(response.data);
            toast.success("Deleted Flight Successfully!!");
            await getOwnerFlights(dispatch);
        } catch (error) {
            console.log(error);
            toast.error("Error deleting flight try another time");
        }
        await getAllSchedules(dispatch)
        await fetchAllFlights(dispatch)

    }
    //Function too convert the dateTime String to readable format
    function formatDateTime(dateTimeStr) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        };
        return new Date(dateTimeStr).toLocaleString(undefined, options);
    }

    //updating Schedule
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/flight/schedule/update/${editSchedule.id}`, editSchedule
                , {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                })
            console.log(response.data);
            toast.success("Schedule Updated Successfully!")
            setEditSchedule(null)

        } catch (error) {
            console.log(error);
            const errMsg = error.response?.data?.message || 'Something went wrong'
            toast.error(errMsg);

        }
        await getAllSchedules(dispatch)
    }

    const handleBookings = (scheduleId) => {
        navigate("/flightOwner/get-bookings", { state: { 'scheduleId': scheduleId } })
    }

    

    








return (
    <div className='container py-4'>
        <h1 className='text-center mb-4'>All Scheduled Flights ✈️📅</h1>
        
        <div className="row g-3">
            {!searching && flights.map((f, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 fw-bold">✈️ {f.flight.flightNumber}</h6>
                            <span className="badge bg-light text-dark">₹{f.fare}</span>
                        </div>


                        <div className="card-body">

                            <div className="mb-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="fw-bold">{f.flight.route.origin}</span>
                                    <span className="text-muted">→</span>
                                    <span className="fw-bold">{f.flight.route.destination}</span>
                                </div>
                                <small className="text-muted">Duration: {f.flight.route.duration}</small>
                            </div>


                            <div className="row mb-3">
                                <div className="col-6">
                                    <small className="text-muted">Departure</small>
                                    <div className="fw-medium">{formatDateTime(f.departureTime)}</div>
                                </div>
                                <div className="col-6">
                                    <small className="text-muted">Arrival</small>
                                    <div className="fw-medium">{formatDateTime(f.arrivalTime)}</div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">Total Seats</small>
                                <div className="fw-medium">{f.flight.totalSeats}</div>
                            </div>
                        </div>


                        <div className="card-footer bg-light">
                            <div className="d-flex gap-2">

                                <div className="dropdown flex-grow-1" data-bs-boundary="viewport">
                                    <button className="btn btn-outline-secondary btn-sm dropdown-toggle w-100" type="button" data-bs-container="body" data-bs-display="static" data-bs-toggle="dropdown" aria-expanded="false">
                                        Actions
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#detailsModal-${f.id}`}>
                                                View Details
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item"
                                                onClick={() => {
                                                    setEditSchedule(f)
                                                }}>
                                                Edit
                                            </button>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button className="dropdown-item text-danger" data-bs-toggle="modal" data-bs-target={`#deleteModal-${f.id}`}>
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                                {/* Bookings Button */}
                                <button onClick={() => handleBookings(f.id)} className='btn btn-primary btn-sm'>
                                    🎫 Bookings
                                </button>
                            </div>
                        </div>

                        {/* Details Modal */}
                        <div className="modal fade" id={`detailsModal-${f.id}`} tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Flight {f.flight.flightNumber} Details</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Flight Information</h6>
                                                <p><strong>Flight:</strong> {f.flight.flightNumber}</p>
                                                <p><strong>Route:</strong> {f.flight.route.origin} → {f.flight.route.destination}</p>
                                                <p><strong>Duration:</strong> {f.flight.route.duration}</p>
                                                <p><strong>Departure:</strong> {formatDateTime(f.departureTime)}</p>
                                                <p><strong>Arrival:</strong> {formatDateTime(f.arrivalTime)}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h6>Schedule & Pricing</h6>
                                                <p><strong>Fare:</strong> ₹{f.fare}</p>
                                                <h6>Business Class Rate</h6>
                                                <p><strong>Fare:</strong> ₹{f.businessClassRate * f.fare}</p>
                                                <h6>First Class Rate</h6>
                                                <p><strong>Fare:</strong> ₹{f.firstClassRate * f.fare}</p>

                                            </div>

                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6>Perks</h6>
                                                <p><strong>Free Meal:</strong> {f.freeMeal}</p>
                                                <p><strong>Meal Available:</strong> {f.mealAvailable}</p>
                                                <p><strong>WiFi:</strong> {f.isWifiAvailable}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h6>Baggage & Seating</h6>
                                                <p><strong>Check-in Baggage:</strong> {f.flight.baggageCheckin} kg</p>
                                                <p><strong>Cabin Baggage:</strong> {f.flight.baggageCabin} kg</p>
                                                <p><strong>Total Seats:</strong> {f.flight.totalSeats}</p>
                                                <p><strong>First Class:</strong> {f.flight.firstClassSeats} Seats</p>
                                                <p><strong>Business Class:</strong> {f.flight.businessClassSeats} Seats</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delete Modal */}
                        <div className="modal fade" id={`deleteModal-${f.id}`} tabIndex={-1}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Delete Flight</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        Are you sure you want to delete flight <strong>{f.flight.flightNumber}</strong>?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button onClick={() => handleDelete(f.id)} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                            Yes, Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))

            }
        </div>

        {/* Edit modal */}
        {
            editSchedule !== null ? (
                <div className="modal fade show" id="editSchedule" tabIndex={-1} style={{ display: 'block' }} aria-modal="true" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className='card'>
                                <div className='card-body'>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="flightName" className="form-label">Choose flight</label>
                                            <select name="" className='form-select' id=""
                                                value={editSchedule.flight.id}
                                                onChange={(e) => {

                                                    const selectedFlight = iFlights.find(f => f.id.toString() === e.target.value);
                                                    setEditSchedule({
                                                        ...editSchedule,
                                                        flight: selectedFlight
                                                    });
                                                }}>
                                                {
                                                    iFlights.map((f, index) => (
                                                        <option
                                                            key={index}
                                                            value={f.id}
                                                        >
                                                            {f.flightNumber}, {f.route.origin} → {f.route.destination}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label">Departure Time:</label>
                                            <input type="datetime-local" className='form-control'
                                                min={new Date().toISOString().slice(0, 16)}
                                                value={editSchedule.departureTime} onChange={(e) => setEditSchedule({
                                                    ...editSchedule,
                                                    departureTime: e.target.value
                                                })} />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="form-label">Arrival Time:</label>
                                            <input type="datetime-local" className='form-control'
                                                min={editSchedule.departureTime || new Date().toISOString().slice(0, 16)}
                                                value={editSchedule.arrivalTime}
                                                onChange={(e) => setEditSchedule({
                                                    ...editSchedule,
                                                    arrivalTime: e.target.value
                                                })} />
                                        </div>

                                        <h6 className='text-center m-3'>Add Perks for the Flight</h6>
                                        <div className='row g-3' >
                                            <div className="col-12 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Wifi Available</label>
                                                    <select value={editSchedule.isWifiAvailable}
                                                        className="form-select"
                                                        onChange={e => setEditSchedule({
                                                            ...editSchedule,
                                                            isWifiAvailable: e.target.value
                                                        })}
                                                    >
                                                        <option value="" disabled>Select option</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Free Meal</label>
                                                    <select value={editSchedule.freeMeal}
                                                        className="form-select"
                                                        onChange={e => setEditSchedule({
                                                            ...editSchedule,
                                                            freeMeal: e.target.value
                                                        })}
                                                    >
                                                        <option value="" disabled>Select option</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Business Class Rate</label>
                                                    <input step="0.1" value={editSchedule.businessClassRate} placeholder=' * original fare will be total seat price' type="Number" className='form-control' onChange={(e) => setEditSchedule({
                                                        ...editSchedule,
                                                        businessClassRate: e.target.value
                                                    })} />
                                                </div>
                                            </div>

                                            {/* Right column */}
                                            <div className="col-12 col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Meal Available</label>
                                                    <select value={editSchedule.mealAvailable}
                                                        className="form-select"
                                                        onChange={e => setEditSchedule({
                                                            ...editSchedule,
                                                            mealAvailable: e.target.value
                                                        })}
                                                    >
                                                        <option value="" disabled>Select option</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Fare💵</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={editSchedule.fare}
                                                        onChange={e => setEditSchedule({
                                                            ...editSchedule,
                                                            fare: e.target.value
                                                        })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" >First Class Rate</label>
                                                    <input value={editSchedule.firstClassRate} placeholder=' * original fare will be total seat price' step="0.1" type="Number" className='form-control' onChange={(e) => setEditSchedule({
                                                        ...editSchedule,
                                                        firstClassRate: e.target.value
                                                    })} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className='d-flex justify-content-center align-items-center m-2'>
                                            <button type='submit' className='btn btn-primary m-2' onClick={(e) => handleUpdate(e)}>Update</button>
                                            <button className='btn btn-secondary m-2' onClick={() => setEditSchedule(null)}>Cancel</button>
                                        </div>

                                        <div>

                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ) : ""
        }
    </div>

)
}


export default SchdeuledFlights