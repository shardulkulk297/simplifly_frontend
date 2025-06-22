import React, { useEffect, useState } from 'react'
import OwnerLayout from './OwnerLayout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getOwnerFlights } from '../../store/action/FlightAction';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const SchdeuledFlights = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const flights = useSelector(state=>state.allFlights.flights);
    
    useEffect(() => {
        const getFlights = async() => {
            try {
                setLoading(true);
                await getOwnerFlights(dispatch);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getFlights();
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

    return (
        <div className='container py-5'>
            <div className='row'>
                {
                    flights.map((f, index) =>
                        <div className="col-md-6 col-lg-4 mb-4" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title mb-3">FLIGHT {f.flight.flightNumber}</h5>
                                    <p className="card-text mb-1">
                                        <strong>Route:</strong> {f.flight.route.origin}  → {f.flight.route.destination} ({f.flight.route.duration})
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Departure:</strong> {f.departureTime}
                                    </p>
                                    <p className="card-text mb-3">
                                        <strong>Arrival:</strong> {f.arrivalTime}
                                    </p>

                                    <p className="card-text mb-1">
                                        <strong>Baggage:</strong> Check‑in {f.flight.baggageCheckin} kg, Cabin {f.flight.baggageCabin}kg
                                    </p>
                                    <p className="card-text mb-3">
                                        <strong>Seats:</strong> Total: {f.flight.totalSeats}, First-Class:  {f.flight.firstClassSeats}, Business-Class:  {f.flight.businessClassSeats}
                                    </p>
                                    <p className="card-text">
                                        <strong>Fare:</strong> {f.fare}₹
                                    </p>
                                    <button className="btn btn-outline-primary btn-lg">
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-lg m-2">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }


            </div>


        </div>
    )
}

export default SchdeuledFlights