import React, { useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchAllFlights, getOwnerFlights } from '../../store/action/FlightAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import WeekdaysDropdown from './ui/WeekDaysDropdown'
import "../../assets/css/flight.css"
import { getAllSchedules } from '../../store/action/ScheduleAction';
const SchdeuledFlights = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [editSchedule, setEditSchedule] = useState(null);
    const [operatingDays, setOperatingDays] = useState([]);
    const flights = useSelector(state => state.schedules.schedules);
    const iFlights = useSelector(state => state.allFlights.flights);

    
    //Delete function
    const handleDelete = async (flightId) => {

        try {
            console.log(flightId);
            const response = await axios.put(`http://localhost:8080/api/flight/schedule/delete/${flightId}`,
                { status: "INACTIVE" },
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

    }

    //updating Schedule
    const handleUpdate = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/flight/schedule/update/${editSchedule.id}`,{
                editSchedule
            },{
                headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
            })
            console.log(response.data);
            toast.success("Schedule Updated Successfully!")
            setEditSchedule(null)

        } catch (error) {
            console.log(error);
            
        }
    }

    



    return (
        <div className='container py-4'>
            <h1 className='text-center mb-4'>All Scheduled Flights ✈️📅</h1>

            <div className="table-responsive fix-overflow">
                <table className="table table-striped table-hover ">
                    <thead className="table-primary">
                        <tr>
                            <th>Flight</th>
                            <th>Route</th>
                            <th>Schedule</th>
                            <th>Fare</th>
                            <th>Seats</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((f, index) => (
                            <tr key={index}>
                                <td>
                                    <strong>{f.flight.flightNumber}</strong>
                                </td>
                                <td>
                                    {f.flight.route.origin} → {f.flight.route.destination}
                                    <br />
                                    <small className="text-muted">Duration: {f.flight.route.duration}</small>
                                </td>
                                <td>
                                    <div>Departure: {f.departureTime}</div>
                                    <div>Arrival: {f.arrivalTime}</div>
                                    <div className="mt-1">
                                        {f.operatingDays.map((day, idx) => (
                                            <span key={idx} className="badge bg-primary text-white me-1">{day.substring(0, 3)}</span>
                                        ))}
                                    </div>
                                    <small className="text-muted">{f.startDate} to {f.endDate}</small>
                                </td>
                                <td>
                                    <strong>₹{f.fare}</strong>
                                </td>
                                <td>
                                    Total: {f.flight.totalSeats}
                                    <br />
                                    <small className="text-muted">
                                        First: {f.flight.firstClassSeats} | Business: {f.flight.businessClassSeats}
                                    </small>
                                </td>
                                <td>
                                    <div className="d-flex">
                                        {/* Actions Dropdown */}
                                        <div className="dropdown" data-bs-boundary="viewport">
                                            <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-container="body"  data-bs-display="static"  data-bs-toggle="dropdown"  aria-expanded="false">
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
                                        <button onClick={() => navigate("/flightOwner/get-bookings")} className='btn btn-primary btn-sm ms-2'>
                                            Bookings
                                        </button>
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
                                                            <p><strong>Departure:</strong> {f.departureTime}</p>
                                                            <p><strong>Arrival:</strong> {f.arrivalTime}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6>Schedule & Pricing</h6>
                                                            <p><strong>Start Date:</strong> {f.startDate}</p>
                                                            <p><strong>End Date:</strong> {f.endDate}</p>
                                                            <p><strong>Operating Days:</strong> {f.operatingDays.join(', ')}</p>
                                                            <p><strong>Fare:</strong> ₹{f.fare}</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h6>Perks</h6>
                                                            <p><strong>Free Meal:</strong> {f.freeMeal ? 'Yes' : 'No'}</p>
                                                            <p><strong>Meal Available:</strong> {f.mealAvailable ? 'Yes' : 'No'}</p>
                                                            <p><strong>WiFi:</strong> {f.isWifiAvailbale ? 'Yes' : 'No'}</p>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6>Baggage & Seating</h6>
                                                            <p><strong>Check-in Baggage:</strong> {f.flight.baggageCheckin} kg</p>
                                                            <p><strong>Cabin Baggage:</strong> {f.flight.baggageCabin} kg</p>
                                                            <p><strong>Total Seats:</strong> {f.flight.totalSeats}</p>
                                                            <p><strong>First Class:</strong> {f.flight.firstClassSeats}</p>
                                                            <p><strong>Business Class:</strong> {f.flight.businessClassSeats}</p>
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
                                </td>
                            </tr>
                        ))}



                    </tbody>
                </table>
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
                                                        value={editSchedule.flight}
                                                        onChange={(e) => setEditSchedule({
                                                            ...editSchedule,
                                                            flight: e.target.value
                                                        }
                                                        )}>
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
                                                    <input type="time" className='form-control' value={editSchedule.departureTime} onChange={(e) => setEditSchedule({
                                                        ...editSchedule,
                                                        departureTime: e.target.value
                                                    })} />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label">Arrival Time:</label>
                                                    <input type="time" className='form-control' value={editSchedule.arrivalTime} onChange={(e) => setEditSchedule({
                                                        ...editSchedule,
                                                        arrivalTime: e.target.value
                                                    })} />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label">Start Date of Schedule</label>
                                                    <input type="date" className='form-control' value={editSchedule.startDate}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        onChange={(e) => setEditSchedule({
                                                            ...editSchedule,
                                                            startDate: e.target.value
                                                        })} />
                                                </div>
                                                <div>
                                                    <label htmlFor="" className="form-label">End Date of the Schedule</label>
                                                    <input type="date" className='form-control' value={editSchedule.endDate}
                                                        min={editSchedule.startDate || new Date().toISOString().split('T')[0]}
                                                        onChange={(e) => setEditSchedule({
                                                            ...editSchedule,
                                                            endDate: e.target.value
                                                        })} />
                                                </div>
                                                <div>
                                                    <WeekdaysDropdown
                                                        selectedDays={editSchedule.operatingDays}
                                                        setSelectedDays={days=>setEditSchedule({
                                                            ...editSchedule,
                                                            operatingDays: days
                                                        })}
                                                        className="form-label" />
                                                </div>
                                                <h6 className='text-center m-3'>Add Perks for the Flight</h6>
                                                <div className='row g-3' >
                                                    <div className="col-12 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Wifi Available</label>
                                                            <select value={editSchedule.isWifiAvailbale}
                                                                className="form-select"
                                                                onChange={e => setEditSchedule({
                                                                    ...editSchedule,
                                                                    isWifiAvailbale: e.target.value
                                                                })}
                                                            >
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
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
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
                                                    </div>

                                                </div>
                                                <div className='d-flex justify-content-center align-items-center m-2'>
                                                    <button type='submit' className='btn btn-primary m-2' onClick={(e)=> handleUpdate(e)}>Update</button>
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
        </div >
    )
}

export default SchdeuledFlights