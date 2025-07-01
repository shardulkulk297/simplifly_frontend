import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        const removeToken = () => {
            localStorage.clear();
        }
        removeToken();
    }, [])
    function validateEmail(email) {

        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    const signupUser = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            toast.error("Username is required");
            return;
        }

        if (username.length < 3 || username.length > 10) {
            toast.error("Username must be between 4 and 20 characters");
            return;
        }

        if (!password.trim()) {
            toast.error("Password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (!role) {
            toast.error("Please select a role");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!contact.trim()) {
            toast.error("Contact number is required");
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            toast.error("Contact must be a 10-digit number");
            return;
        }

        if ((role === "CUSTOMER" || role === "FLIGHTOWNER") && !name.trim()) {
            toast.error("Name / Company Name is required");
            return;
        }

        if ((role === "CUSTOMER" || role === "FLIGHTOWNER") && !image) {
            toast.error("Please upload an image or logo");
            return;
        }

        // Optional: validate address for CUSTOMER
        if (role === "CUSTOMER" && !address.trim()) {
            toast.error("Address is required");
            return;
        }

        if (role === "CUSTOMER") {
            try {
                const formData = new FormData();
                formData.append("file", image);
                const response = await axios.post("http://localhost:8080/api/customer/add",
                    {
                        "user": {
                            "username": username,
                            "password": password
                        },
                        "fullName": name,
                        "email": email,
                        "contactNumber": contact,
                        "address": address
                    }
                )
                console.log(response.data);

                const customer = await axios.put(`http://localhost:8080/api/customer/upload/image/${response.data.id}`,
                    formData
                )
                console.log(customer.data);
                toast.success("Added Customer Successfully");
                navigate("/")
            } catch (error) {
                console.log(error);
            }
        }
        else if (role === "FLIGHTOWNER") {
            try {
                const formData = new FormData();
                formData.append("file", image);

                const response = await axios.post("http://localhost:8080/api/flightOwner/add",
                    {
                        "user": {
                            "username": username,
                            "password": password
                        },
                        "companyName": name,
                        "email": email,
                        "contactPhone": contact
                    }
                )
                console.log(response.data);

                const flightOwner = await axios.put(`http://localhost:8080/api/flightOwner/upload/logo/${response.data.id}`,
                    formData
                )
                console.log(flightOwner.data);
                toast.success("Added FlightOwner Successfully");
                navigate("/")

            } catch (error) {
                console.log(error);
                const errMsg = error.response?.data?.message || 'Something went wrong'
                toast.error(errMsg);
            }
        }

    }

    return (
        <div className="min-vh-100 d-flex align-items-center py-4">
            {/* Overlay for better readability */}
            <div className="position-absolute w-100 h-100"></div>

            <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5">
                        {/* Brand Section */}
                        <div className="text-center mb-3">
                            <h1 className="display-5 fw-bold text-black mb-2">
                                ✈️ SimpliFly
                            </h1>
                            <p className="text-grey-50 fs-6">Your journey begins here</p>
                        </div>

                        {/* Signup Card */}
                        <div className="card shadow-lg border-0" style={{
                            borderRadius: '15px',
                            backdropFilter: 'blur(10px)',
                            background: 'rgba(255, 255, 255, 0.95)',
                            maxHeight: '85vh',
                            overflowY: 'auto'
                        }}>
                            <div className="card-header bg-transparent border-0 text-center py-3">
                                <h4 className="mb-0 text-dark fw-semibold">Welcome to SimpliFly</h4>
                                <p className="text-muted mt-1 mb-0">Sign Up</p>
                            </div>

                            <div className="card-body px-4 py-3">
                                {msg !== "" && (
                                    <div className={`alert ${msg.includes('SUCCESSFUL') ? 'alert-success' : 'alert-danger'} border-0 rounded-3 py-2`}>
                                        <div className="d-flex align-items-center">
                                            <span className="me-2">
                                                {msg.includes('SUCCESSFUL') ? '✅' : '❌'}
                                            </span>
                                            {msg}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Username</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            👤
                                        </span>
                                        <input
                                            type="text" required
                                            className="form-control border-start-0 py-2"
                                            placeholder="Enter your username"
                                            style={{ fontSize: '15px' }}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold text-dark mb-1">Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            🔒
                                        </span>
                                        <input
                                            type="password" required
                                            className="form-control border-start-0 py-2"
                                            placeholder="Enter your password"
                                            style={{ fontSize: '15px' }}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold mb-2">Sign up as</label>
                                    <div className="btn-group w-100" role="group" aria-label="Role selection">
                                        <input required
                                            type="radio"
                                            className="btn-check"
                                            name="role"
                                            id="roleCustomer"
                                            value="CUSTOMER"
                                            checked={role === "CUSTOMER"}
                                            onChange={e => setRole(e.target.value)}
                                        />
                                        <label className="btn btn-outline-primary btn-sm" htmlFor="roleCustomer">
                                            👤 Customer
                                        </label>

                                        <input
                                            type="radio" required
                                            className="btn-check"
                                            name="role"
                                            id="roleOwner"
                                            value="FLIGHTOWNER"
                                            checked={role === "FLIGHTOWNER"}
                                            onChange={e => setRole(e.target.value)}
                                        />
                                        <label className="btn btn-outline-primary btn-sm" htmlFor="roleOwner">
                                            ✈️ Flight‐Owner
                                        </label>


                                    </div>
                                </div>

                                {role === "CUSTOMER" && (
                                    <div>
                                        <div className='mb-3'>
                                            <label className="form-label fw-semibold text-dark mb-1">Full Name</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    👤
                                                </span>
                                                <input
                                                    type="text" required
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Enter your full name"
                                                    style={{ fontSize: '15px' }}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <label className="form-label fw-semibold text-dark mb-1">Contact</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    📞
                                                </span>
                                                <input
                                                    type="text" required
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Enter your contact number"
                                                    style={{ fontSize: '15px' }}
                                                    onChange={(e) => setContact(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label fw-semibold text-dark mb-1">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    📩
                                                </span>
                                                <input
                                                    type="email" required
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Enter your Email"
                                                    style={{ fontSize: '15px' }}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <label className="form-label fw-semibold text-dark mb-1">Address</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    🏠
                                                </span>
                                                <input
                                                    type="text" required
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Enter your address"
                                                    style={{ fontSize: '15px' }}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='mb-3'>
                                            <label className="form-label fw-semibold text-dark mb-1">Upload Profile Picture</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    📷
                                                </span>
                                                <input
                                                    type="file" required
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Upload Profile Picture"
                                                    style={{ fontSize: '15px' }}
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {
                                    role === "FLIGHTOWNER" &&
                                    (
                                        <div>
                                            <div className='mb-3'>
                                                <label className="form-label fw-semibold text-dark mb-1">Company Name</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        👤
                                                    </span>
                                                    <input required
                                                        type="text"
                                                        className="form-control border-start-0 py-2"
                                                        placeholder="Enter your Company Name"
                                                        style={{ fontSize: '15px' }}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='mb-3'>
                                                <label className="form-label fw-semibold text-dark mb-1">Email</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        📩
                                                    </span>
                                                    <input
                                                        type="text" required
                                                        className="form-control border-start-0 py-2"
                                                        placeholder="Enter your Company Email"
                                                        style={{ fontSize: '15px' }}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className='mb-3'>
                                                <label className="form-label fw-semibold text-dark mb-1">Contact</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        📞
                                                    </span>
                                                    <input
                                                        type="text" required
                                                        className="form-control border-start-0 py-2"
                                                        placeholder="Enter your contact number"
                                                        style={{ fontSize: '15px' }}
                                                        onChange={(e) => setContact(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className='mb-3'>
                                                <label className="form-label fw-semibold text-dark mb-1">Upload Logo</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-end-0">
                                                        📷
                                                    </span>
                                                    <input
                                                        type="file" required
                                                        className="form-control border-start-0 py-2"
                                                        placeholder="Upload Logo"
                                                        style={{ fontSize: '15px' }}
                                                        onChange={(e) => setImage(e.target.files[0])}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="d-grid mb-3">
                                    <button type='submit' onClick={(e) => signupUser(e)}
                                        className="btn btn-primary py-2 fw-semibold"
                                        style={{
                                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            fontSize: '16px'
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>

                            <div className="card-footer bg-transparent border-0 text-center py-3">
                                <p className="mb-0 text-muted small">
                                    Already have an account?
                                    <Link to="/" className="text-decoration-none fw-semibold ms-1" style={{ color: '#667eea' }}>
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-3">
                            <p className="text-white-50 small mb-0">
                                ©2025 SimpliFly. Fly with confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup