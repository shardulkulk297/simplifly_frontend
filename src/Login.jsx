import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");


    const loginUser = async () => {
        try {
            /*
            First passing in encoded credentials and getting the token
            */
            let encodedString = window.btoa(username + ":" + password);
            const response = await axios.get("http://localhost:8080/api/user/getToken", {
                headers: { "Authorization": "Basic " + encodedString }
            })
            // console.log(response);
            let token = response.data;
            console.log(token);
            localStorage.setItem("token", token);
            /*
            Passing in the token and getting the details of the user specifically role
            */
            const details = await axios.get("http://localhost:8080/api/user/getLoggedInUserDetails", {
                headers: { "Authorization": "Bearer " + token }
            })
            console.log(details);
            const role = details.data.user.role;

            switch (role) {
                case "CUSTOMER":
                    // console.log("CUSTOMER DASHBOARD");
                    navigate("/customer");
                    break;
                case "FLIGHTOWNER":
                    // console.log("FLIGHTOWNER DASHBOARD");
                    navigate("/flightOwner")
                    break;
                case "MANAGER":
                    console.log("MANAGER DASHBOARD");
                    break;
                default:
                    console.log("SOMETHING WENT WRONG");
            }
            setMsg("LOGIN SUCCESSFUL!!!!")

        } catch (error) {
            console.log(error);
            setMsg("Login Failed");
        }
    }
    return (
        <div className="min-vh-100 d-flex align-items-center" style={{
            background: '#f8f9fa',
            backgroundAttachment: 'fixed'
        }}>
            {/* Overlay for better readability */}
            <div className="position-absolute w-100 h-100" style={{
                background: 'rgba(0,0,0,0.1)',
                zIndex: 1
            }}></div>
            
            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        {/* Brand Section */}
                        <div className="text-center mb-4">
                            <h1 className="display-4 fw-bold text-black mb-2">
                                ✈️ SimpliFly
                            </h1>
                            <p className="text-grey-50 fs-5">Your journey begins here</p>
                        </div>

                        {/* Login Card */}
                        <div className="card shadow-lg border-0" style={{
                            borderRadius: '15px',
                            backdropFilter: 'blur(10px)',
                            background: 'rgba(255, 255, 255, 0.95)'
                        }}>
                            <div className="card-header bg-transparent border-0 text-center py-4">
                                <h3 className="mb-0 text-dark fw-semibold">Welcome Back</h3>
                                <p className="text-muted mt-2">Sign in to your account</p>
                            </div>
                            
                            <div className="card-body px-4 pb-4">
                                {msg !== "" && (
                                    <div className={`alert ${msg.includes('SUCCESSFUL') ? 'alert-success' : 'alert-danger'} border-0 rounded-3`}>
                                        <div className="d-flex align-items-center">
                                            <span className="me-2">
                                                {msg.includes('SUCCESSFUL') ? '✅' : '❌'}
                                            </span>
                                            {msg}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark">Username</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="fas fa-user text-muted"></i>
                                            👤
                                        </span>
                                        <input 
                                            type="text" 
                                            className="form-control border-start-0 py-3"
                                            placeholder="Enter your username"
                                            style={{ fontSize: '16px' }}
                                            onChange={(e) => setUsername(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold text-dark">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="fas fa-lock text-muted"></i>
                                            🔒
                                        </span>
                                        <input 
                                            type="password" 
                                            className="form-control border-start-0 py-3"
                                            placeholder="Enter your password"
                                            style={{ fontSize: '16px' }}
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <div className="d-grid mb-3">
                                    <button 
                                        className="btn btn-primary btn-lg py-3 fw-semibold"
                                        style={{
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            fontSize: '18px'
                                        }}
                                        onClick={() => loginUser()}
                                    >
                                        Sign In
                                    </button>
                                </div>

                                <div className="text-center">
                                    <a href="#" className="text-decoration-none" style={{ color: '#667eea' }}>
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div className="card-footer bg-transparent border-0 text-center py-4">
                                <p className="mb-0 text-muted">
                                    Don't have an account? 
                                    <a href="#" className="text-decoration-none fw-semibold ms-1" style={{ color: '#667eea' }}>
                                        Sign Up here
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-4">
                            <p className="text-white-50 small">
                                ©2025 SimpliFly. Fly with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login