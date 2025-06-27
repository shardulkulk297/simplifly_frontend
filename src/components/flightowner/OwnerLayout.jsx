import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
                    <Link className='navbar-brand fw-bold' to="/">
                        <span>✈️ SkyBooker</span>
                    </Link>
                    <div className='d-flex'>
                        <Link to="/flightOwner/profile" className="btn btn-primary">
                            Profile
                        </Link>
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