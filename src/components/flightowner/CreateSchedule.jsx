import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllFlights } from '../../store/action/FlightAction'
import axios from 'axios'
import toast from 'react-hot-toast'
import WeekdaysDropdown from './ui/WeekDaysDropdown'

const CreateSchedule = () => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [fare, setFare] = useState(0);
    const [freeMeal, setFreeMeal] = useState("No");
    const [mealAvailable, setMealAvailable] = useState("No");
    const [isWifiAvailable, setWifiAvailable] = useState("No");
    const [operatingDays, setOperatingDays] = useState([]);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [loading, setLoading] = useState(false);

    const flights = useSelector(state => state.allFlights.flights);
    const dispatch = useDispatch()
   

    if (loading) {
        return (
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-12 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading flights...</p>
                    </div>
                </div>
            </div>
        )
    }

    const handleFlightChange = (flightId) => {
        const flight = flights.find(f => f.id.toString() === flightId);
        console.log(flight)
        setSelectedFlight(flight)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(selectedFlight);
        // console.log(departureTime);
        // console.log(arrivalTime);
        // console.log(fare);
        try {
            const data = {
                flight: selectedFlight,
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                startDate: startDate,
                endDate: endDate,
                operatingDays: operatingDays.map(d => d.toUpperCase()),
                fare: parseFloat(fare),
                isWifiAvailable: isWifiAvailable,
                freeMeal: freeMeal,
                mealAvailable: mealAvailable
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            };

            const response = await axios.post(
                'http://localhost:8080/api/flight/schedule/add',
                data,
                config
            );

            console.log(response.data);
            toast.success("Flight " + response.data.flight.flightNumber + " Scheduled Successfully!!");
            setSelectedFlight(null);
            setDepartureTime("");
            setArrivalTime("");
            setFare(0);
            setFreeMeal("");
            setMealAvailable("");
            setWifiAvailable("");
            setOperatingDays([]);
            setStartDate("");
            setEndDate("");

        } catch (error) {
            if (error.response) {
                console.error('STATUS:', error.response.status);
                console.error('HEADERS:', error.response.headers);
                console.error('BODY:', error.response.data);
            } else {
                console.error(error);
            }
        }
    }

    return (
        <div className='container-fluid min-vh-100 py-5'>
            <h1>Schedule your Flights 📅</h1>
            <div className="d-flex justify-content-center align-items-center">

                <div className="w-100" style={{ maxWidth: "700px" }}>

                    <div className="d-flex justify-content-center gap-3 mb-3">
                        <Link to="/flightOwner/new-flight" className="btn btn-outline-primary">
                            Add Flight
                        </Link>
                    </div>

                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="flightName" className="form-label">Choose flight</label>
                                    <select name="" className='form-select' id=""
                                        value={selectedFlight?.id || ""}
                                        onChange={(e) => handleFlightChange(e.target.value)}>
                                        <option value="" disabled>
                                            -- Select a flight --
                                        </option>
                                        {
                                            flights.map((f, index) => (
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
                                    <input type="time" className='form-control' onChange={(e) => setDepartureTime(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">Arrival Time:</label>
                                    <input type="time" className='form-control' onChange={(e) => setArrivalTime(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">Start Date of Schedule</label>
                                    <input type="date" className='form-control'
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setStartDate(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="" className="form-label">End Date of the Schedule</label>
                                    <input type="date" className='form-control'
                                        min={startDate || new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                <div>
                                    <WeekdaysDropdown className="form-label"
                                        selectedDays={operatingDays}
                                        setSelectedDays={setOperatingDays}
                                    />
                                </div>
                                <h6 className='text-center m-3'>Add Perks for the Flight</h6>
                                <div className='row g-3' >
                                    <div className="col-12 col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Wifi Available</label>
                                            <select value={isWifiAvailable}
                                                className="form-select"
                                                onChange={e => setWifiAvailable(e.target.value)}
                                            >
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Free Meal</label>
                                            <select value={freeMeal}
                                                className="form-select"
                                                onChange={e => setFreeMeal(e.target.value)}
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
                                            <select value={mealAvailable}
                                                className="form-select"
                                                onChange={e => setMealAvailable(e.target.value)}
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
                                                value={fare}
                                                onChange={e => setFare(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-center align-items-center m-2'>
                                    <button type='submit' className='btn btn-primary'>Create Schedule</button>
                                </div>

                                <div>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default CreateSchedule