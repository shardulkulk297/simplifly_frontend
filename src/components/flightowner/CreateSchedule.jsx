import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllFlights } from '../../store/action/FlightAction'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getAllSchedules } from '../../store/action/ScheduleAction'


const CreateSchedule = () => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [fare, setFare] = useState(0);
    const [freeMeal, setFreeMeal] = useState("No");
    const [mealAvailable, setMealAvailable] = useState("No");
    const [isWifiAvailable, setWifiAvailable] = useState("No");
    const [loading, setLoading] = useState(false);
    const [firstClassRate, setFirstClassRate] = useState(0);
    const [businessClassRate, setBusinessClassRate] = useState(0);

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
                fare: parseFloat(fare),
                isWifiAvailable: isWifiAvailable,
                freeMeal: freeMeal,
                mealAvailable: mealAvailable,
                businessClassRate: parseFloat(businessClassRate),
                firstClassRate: parseFloat(firstClassRate)
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



            await getAllSchedules(dispatch)

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
        <div className='container-fluid min-vh-100'>
            <h1>Schedule your Flights 📅</h1>
            <div className="d-flex justify-content-center align-items-center">

                <div className="w-100" style={{ maxWidth: "700px" }}>



                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <label htmlFor="flightName" className="form-label">Choose flight</label>
                                    <select required name="" className='form-select form-select-sm' id=""
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
                                <div className='mb-2'>
                                    <label htmlFor="" className='form-label '>Departure Time</label>
                                      <input required type="datetime-local" className='form-control form-control-sm'
                                    value={departureTime}
                                    min={new Date().toISOString().slice(0, 16)}
                                    onChange={(e) => setDepartureTime(e.target.value)} />
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="" className='form-label'>Arrival Time</label>
                                     <input type="datetime-local" className='form-control form-control-sm'
                                    value={arrivalTime}
                                    min={departureTime || new Date().toISOString().slice(0, 16)}
                                    onChange={(e) => setArrivalTime(e.target.value)} />
                                </div>
                            
                                <h6 className='text-center mb-2'>Add Perks for the Flight</h6>
                                <div className='row g-3' >
                                    <div className="col-12 col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">Wifi Available</label>
                                            <select required value={isWifiAvailable}
                                                className="form-select form-select-sm"
                                                onChange={e => setWifiAvailable(e.target.value)}
                                            >
                                                <option value="" disabled>Select option</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Free Meal</label>
                                            <select required value={freeMeal}
                                                className="form-select form-select-sm"
                                                onChange={e => setFreeMeal(e.target.value)}
                                            >
                                                <option value="" disabled>Select option</option>  {/* Add this */}
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Business Class Rate</label>
                                            <input required placeholder=' * original fare will be total seat price' type="Number" step="0.1" className='form-control form-control-sm' onChange={(e) => setBusinessClassRate(e.target.value)} />
                                        </div>
                                    </div>

                                    {/* Right column */}
                                    <div className="col-12 col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">Meal Available</label>
                                            <select required value={mealAvailable}
                                                className="form-select form-select-sm"
                                                onChange={e => setMealAvailable(e.target.value)}
                                            >
                                                <option value="" disabled>Select option</option>  {/* Add this */}
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label">Fare💵</label>
                                            <input required
                                                type="number"
                                                className="form-control form-control-sm"
                                                value={fare}
                                                onChange={e => setFare(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label className="form-label" >First Class Rate</label>
                                            <input required placeholder=' * original fare will be total seat price' type="Number" step="0.1" className='form-control form-control-sm' onChange={(e) => setFirstClassRate(e.target.value)} />
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