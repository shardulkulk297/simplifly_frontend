import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { fetchAllFlights } from '../../store/action/FlightAction';
import { getAllSchedules } from '../../store/action/ScheduleAction';
import { useDispatch } from 'react-redux';
const OwnerLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token == null || token == undefined || token == "")
            navigate("/")
    }, [navigate]);
    useEffect(() => {
        const getFlights =  async() => {
            try {
                setLoading(true);
                await fetchAllFlights(dispatch);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getFlights();


    }, [])

    useEffect(() => {
        const getSchedules = async() => {
            try {
                setLoading(true);
                await getAllSchedules(dispatch);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }

        }
        getSchedules();
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className='container'>
                    <a className='navbar-brand fw-bold' href='/'>
                        <span>✈️ SkyBooker</span>
                    </a>
                    <div className='d-flex'>
                        <a href="/bookings" className="btn btn-outline-primary me-2">
                            Verification Status
                        </a>
                        <a href="/profile" className="btn btn-primary">
                            Profile
                        </a>
                    </div>
                </div>
            </nav>

            <Sidebar>
                <div className="p-4">
                    {
                        loading === true ?
                        (
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
                        ) : <Outlet />

                    } 
                    
                </div>
            </Sidebar>
        </>
    );
}

export default OwnerLayout;