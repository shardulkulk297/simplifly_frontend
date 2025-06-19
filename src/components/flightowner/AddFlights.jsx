import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Route } from 'react-router-dom';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //Adding route first
            const payload = {
                origin,
                destination,
                duration
            }
            const config = {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }

            const addedRoute = await axios.post("http://localhost:8080/api/flight/route/add",
                payload,
                config
            )
            console.log(addedRoute.data);

            const payload2 = {
                route: addedRoute.data,
                flightNumber,
                baggageCabin,
                baggageCheckin,
                totalSeats,
                firstClassSeats,
                businessClassSeats
            }
            const flight = await axios.post("http://localhost:8080/api/flight/add",
                payload2,
                config
            )
            console.log(flight);
            toast.success("Flight Added Successfully!!")
        } catch (error) {
            console.log(error);

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
                                            <input type="text" id="flightNumber" className="form-control"
                                                onChange={(e) => setFlightNumber(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="origin" className="form-label">
                                                Origin
                                            </label>
                                            <input type="text" id="origin" className="form-control"
                                                onChange={(e) => setOrigin(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="duration" className="form-label">
                                                Duration
                                            </label>
                                            <input type="text" id="duration" className="form-control"
                                                onChange={e => setDuration(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="baggageCheckin" className="form-label">
                                                Baggage Check‑in (kg)
                                            </label>
                                            <input
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
                                            <input
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
                                            <input type="text" id="destination" className="form-control"
                                                onChange={(e) => setDestination(e.target.value)} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="baggageCabin" className="form-label">
                                                Baggage Cabin (kg)
                                            </label>
                                            <input
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
                                            <input
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
                                            <input
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