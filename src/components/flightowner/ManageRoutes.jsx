import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRoutes } from '../../store/action/RouteAction';
import { Link } from 'react-router-dom';

const ManageRoutes = () => {
    const routes = useSelector(state => state.routes.routes)
    const dispatch = useDispatch();
    useEffect(() => {
        getRoutes(dispatch)
    }, [])
    return (
        <div className='container-fluid py-5'>
            <h1>Routes🛬</h1> 
            <Link to="/flightOwner/new-route" className="btn btn-outline-primary m-1 mb-2">Add Route</Link>
            <div className='row m-10'>
                <div className='col-lg-12'>
                    <div className='card card-body'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">RouteId</th>
                                    <th scope="col">Origin</th> 
                                    <th scope="col">Destination</th>
                                    <th scope="col">Duration</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    routes.map((r, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{r.origin}</td> 
                                            <td>{r.destination}</td>
                                            <td>{r.duration}</td>
                                            <td>
                                                <Link to="/flightOwner/new-flight" className='btn btn-primary me-2'>Add Flight</Link>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                    </div>



                </div>

            </div>




        </div>
    )
}

export default ManageRoutes