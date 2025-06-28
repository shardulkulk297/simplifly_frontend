import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Route } from 'react-router-dom';
import { fetchAllFlights } from '../../store/action/FlightAction';
import { useDispatch } from 'react-redux';

const AddFlights = () => {
    const [flightNumber, setFlightNumber] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState('');
    const [baggageCheckin, setBaggageCheckin] = useState('');
    const [baggageCabin, setBaggageCabin] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const [firstClassSeats, setFirstClassSeats] = useState('');
    const [businessClassSeats, setBusinessClassSeats] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                route: {
                    'origin': origin,
                    'destination': destination,
                    'duration': duration
                },
                flightNumber,
                baggageCabin,
                baggageCheckin,
                totalSeats,
                firstClassSeats,
                businessClassSeats
            }
            const flight = await axios.post("http://localhost:8080/api/flight/add",
                payload,
                {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                }
            )
            console.log(flight);
            await fetchAllFlights(dispatch);
            toast.success("Flight Added Successfully!!")
        } catch (error) {
            console.log(error);
            const errMsg = error.response?.data?.message || 'Something went wrong'
            toast.error(errMsg);

        }

    }

    return (
        <div className='container-fluid min-vh-100 py-5'>
            <h1 className="m-2">Add New Flight✈️</h1>
            <div className="d-flex justify-content-center align-items-center">
                <div className="w-100" style={{ maxWidth: "500px" }}>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">

                                    <div className="col-sm-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="flightNumber" className="form-label">
                                                Flight Number
                                            </label>
                                            <input required type="text" id="flightNumber" className="form-control"
                                                onChange={(e) => setFlightNumber(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="origin" className="form-label">
                                                Origin
                                            </label>
                                            <input required type="text" id="origin" className="form-control"
                                                onChange={(e) => setOrigin(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="duration" className="form-label">
                                                Duration
                                            </label>
                                            <input required type="text" id="duration" className="form-control"
                                                onChange={e => setDuration(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="baggageCheckin" className="form-label">
                                                Baggage Check‑in (kg)
                                            </label>
                                            <input required
                                                type="number"
                                                id="baggageCheckin"
                                                className="form-control"
                                                placeholder="e.g. 10"
                                                onChange={(e) => setBaggageCheckin(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="totalSeats" className="form-label">
                                                Total Seats
                                            </label>
                                            <input required
                                                type="number"
                                                id="totalSeats"
                                                className="form-control"
                                                placeholder="e.g. 50"
                                                onChange={(e) => setTotalSeats(e.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className="col-sm-12 col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="destination" className="form-label">
                                                Destination
                                            </label>
                                            <input required type="text" id="destination" className="form-control"
                                                onChange={(e) => setDestination(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="baggageCabin" className="form-label">
                                                Baggage Cabin (kg)
                                            </label>
                                            <input required
                                                type="number"
                                                id="baggageCabin"
                                                className="form-control"
                                                placeholder="e.g. 5"
                                                onChange={(e) => setBaggageCabin(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="firstClassSeats" className="form-label">
                                                First Class Seats
                                            </label>
                                            <input required
                                                type="number"
                                                id="firstClassSeats"
                                                className="form-control"
                                                placeholder="e.g. 8"
                                                onChange={(e) => setFirstClassSeats(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="businessClassSeats" className="form-label">
                                                Business Class Seats
                                            </label>
                                            <input required
                                                type="number"
                                                id="businessClassSeats"
                                                className="form-control"
                                                placeholder="e.g. 12"
                                                onChange={(e) => setBusinessClassSeats(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Add Flight</button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddFlights