import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSchedule } from '../../store/action/ScheduleAction';
import { useDispatch, useSelector } from 'react-redux';
import BookingHeader from './BookingHeader';
import FlightSummary from './FlightSummary';

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookingdata = location.state.bookingData;
    const totalPrice = location.state.totalPrice;
    const schedule = useSelector(state => state.schedules.schedules);
    const [bookingData, setBookingData] = useState(bookingdata);
    console.log(bookingData);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [bookingResponse, setBookingResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
        amount: '',
        upiApp: '',
        upiId: '',
    });

    useEffect(() => {
        const fetchSchedule = () => {
            try {
                setLoading(true);
                getSchedule(dispatch)(bookingData.scheduleId);
                setLoading(false);
            } catch (error) {
                console.log(error);
                const errMsg = error.response?.data?.message || 'Something went wrong'
                toast.error(errMsg);
            }
        }
        fetchSchedule();
    }, [])



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value);
        setBookingData(prev => ({
            ...prev,
            'paymentMethod': e.target.value
        }))

    }
    const formatDateTime = (dateTimeStr) => {
        const options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
        };
        return new Date(dateTimeStr).toLocaleString(undefined, options);
    }

    const formatTime = (isoDateTime) => {
        return new Date(isoDateTime).toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit'
        });
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (paymentComplete) {
        return (
            <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">

                          
                            <FlightSummary schedule={schedule} formatDateTime={formatDateTime} formatTime={formatTime} />

                            {/* Payment Success Card */}
                            <div className="card shadow-lg mt-4 border-0">
                                <div className="card-body text-center py-5">
                                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                                    <h2 className="text-success mt-3">Payment Successful</h2>
                                    <p className="lead mt-2">Thank you for your payment of <strong>₹{totalPrice}</strong></p>
                                    <p className="text-muted">A confirmation email has been sent to your registered address.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        )
    }

    const handlePayment = async () => {
        if (paymentMethod === "CARD") {
            if (
                !formData.cardNumber ||
                !formData.expiryDate ||
                !formData.cvv ||
                !formData.cardName
            ) {
                toast.error("Please fill all card details.");
                return;
            }
        }
        if (paymentMethod === "UPI") {
            if (!formData.upiApp && !formData.upiId) {
                toast.error("Please choose a UPI app or enter a UPI ID.");
                return;
            }
        }
        try {
            console.log("Sending booking data:", bookingData);
            const response = await axios.post("http://localhost:8080/api/booking/book",
                bookingData,
                {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                })
            console.log(response.data);
            setBookingResponse(response.data);
            toast.success("Booking Successful You will be navigated to booking page shortly!!")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

        setPaymentComplete(true);
        setTimeout(() => {
            navigate('/customer/bookings');
        }, 9000);

    }

    return (
        <div className='container mt-5'>
            <BookingHeader isBookingPage={false} />
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='text-center'>Payment Details</h3>
                        </div>
                        <div className='card-body'>
                            <div className="mb-3">
                                <label className="form-label">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    value={totalPrice}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Select Payment Method:</label>
                                <select className='form-select' onChange={(e) => handlePaymentMethod(e)}>
                                    <option value="">Choose...</option>
                                    <option value="UPI">UPI</option>
                                    <option value="CARD">Card</option>
                                </select>
                            </div>
                            {
                                paymentMethod === "CARD" && (
                                    <>
                                        <div className="mb-3">
                                            <label className="form-label">Card Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="1234 5678 9012 3456"
                                                maxLength="19"
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="expiryDate"
                                                        required
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">CVV</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="cvv"
                                                        required
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        placeholder="123"
                                                        maxLength="3"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Cardholder Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="cardName"
                                                required
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                            />
                                        </div>


                                    </>
                                )
                            }
                            {paymentMethod === "UPI" && (
                                <>
                                    <div className="mb-3 text-center">
                                        <label className="form-label d-block">Scan QR Code</label>
                                        <img
                                            src="../images/qr.png"
                                            alt="QR Code"
                                            style={{ width: '300px', height: '300px' }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label d-block">Choose UPI App</label>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                required
                                                name="upiApp"
                                                id="gpay"
                                                value="GPay"
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="gpay">GPay</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="upiApp"
                                                id="paytm"
                                                value="Paytm"
                                                required

                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="paytm">Paytm</label>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Or enter UPI ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="upiId"
                                            required
                                            value={formData.upiId}
                                            onChange={handleInputChange}
                                            placeholder="example@upi"
                                        />
                                    </div>
                                </>
                            )}
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='btn btn-success' style={{ width: "8rem" }} onClick={handlePayment}>
                                    Pay
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default PaymentPage