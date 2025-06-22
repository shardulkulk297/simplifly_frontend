import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllFlights } from '../../store/action/FlightAction'
import axios from 'axios'
import toast from 'react-hot-toast'

const CreateSchedule = () => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [fare, setFare] = useState(0);
    const [loading, setLoading] = useState(true);
    const flights = useSelector(state => state.allFlights.flights);
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchFlights = async()=>{
            try {
                setLoading(true);
                await fetchAllFlights(dispatch);   
                setLoading(false);             
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchFlights();
    }, [])

    if(loading){
        return(
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
                departureTime,
                arrivalTime,
                fare
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

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid min-vh-100 py-5'>
            <h1>Schedule your Flights 📅</h1>
            <div className="d-flex justify-content-center align-items-center">

                <div className="w-100" style={{ maxWidth: "500px" }}>

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
                                    <label htmlFor="">Departure Time:</label>
                                    <input type="datetime-local" className='form-control' onChange={(e) => setDepartureTime(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="">Arrival Time:</label>
                                    <input type="datetime-local" className='form-control' onChange={(e) => setArrivalTime(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="">Fare</label>
                                    <input type="number" step="0.01" className='form-control' onChange={(e) => setFare(e.target.value)} />
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