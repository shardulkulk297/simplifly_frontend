import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { getRoutes } from '../../store/action/RouteAction';

const AddRoute = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
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
            
            await getRoutes()
            toast.success("Added Route Successfully");
            
        } catch (error) {
            console.log(error);
            
        }


    }

    return (
        <div className='container py-5'>
            <h1>
                Add Route 🛬
            </h1>
            <div className="d-flex justify-content-center align-items-center">
                <div className="w-100" style={{ maxWidth: "500px" }}>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="flightNumber" className="form-label">
                                                Enter Origin:
                                            </label>
                                            <input type="text" id="flightNumber" className="form-control"
                                                onChange={(e) => setOrigin(e.target.value)}
                                            />
                                        </div>
                                         <div className="mb-3">
                                            <label htmlFor="flightNumber" className="form-label">
                                                Enter Destination:
                                            </label>
                                            <input type="text" id="flightNumber" className="form-control"
                                                onChange={(e) => setDestination(e.target.value)}
                                            />
                                        </div>
                                        
                                         <div className="mb-3">
                                            <label htmlFor="flightNumber" className="form-label">
                                                Enter Duration:
                                            </label>
                                            <input type="text" id="flightNumber" className="form-control"
                                                onChange={(e) => setDuration(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                <button type='submit' className='btn btn-primary '>Add Route</button>
                            </form>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default AddRoute