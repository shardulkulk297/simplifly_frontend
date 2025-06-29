import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSchedule } from '../../store/action/ScheduleAction';
import { useDispatch, useSelector } from 'react-redux';

import FlightSummary from './FlightSummary';
import BookingHeader from './BookingHeader';
import SeatSelection from './SeatSelection';
import axios from 'axios';
import toast from 'react-hot-toast';
import PaymentPage from './PaymentPage';

const BookingPage = () => {


    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [seats, setSeats] = useState([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const scheduleId = location.state.scheduleId;
    const schedule = useSelector(state => state.schedules.schedules);
    const [seatNumbers, setSeatNumbers] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [bookingData, setBookingData] = useState({
        scheduleId: scheduleId,
        noOfTickets: 1,
        passengers: [{
            name: '',
            age: '',
            gender: 'MALE'
        }],
        seatNumbers: seatNumbers,
        paymentMethod: ""
    });
    const navigate = useNavigate();

    // Fetch schedule data (keeping as requested)
    useEffect(() => {
        const fetchSchedule = () => {
            try {
                setLoading(true);
                getSchedule(dispatch)(scheduleId);
                setLoading(false);
            } catch (error) {
                console.log(error);
                const errMsg = error.response?.data?.message || 'Something went wrong'
                toast.error(errMsg);
            }
        }
        fetchSchedule();
    }, [])

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:8080/api/flight/schedule/getSeats/${scheduleId}`, {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                })
                console.log(response.data);
                setSeats(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        }
        if (scheduleId) {
            fetchSeats();
        }
    }, [])

    // Utility functions
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

    const handlePassengerChange = (index, field) => e => {
        const value = e.target.value;
        const updatedPassengers = [...bookingData.passengers];
        updatedPassengers[index] = {
            ...updatedPassengers[index],
            [field]: value
        };
        setBookingData(prev => ({
            ...prev,
            passengers: updatedPassengers
        }));
    }


    const onPassengerCountChange = (count) => {
        const passengers = [];

        for (let i = 0; i < count; i++) {
            passengers.push(
                bookingData.passengers[i] || { name: '', age: '', gender: 'MALE' }
            )
        }
        setBookingData(prev => ({
            ...prev,
            noOfTickets: count,
            passengers: passengers
        }))

        setSelectedSeats([]);
        setBookingData(prev => ({ ...prev, seatNumbers: [] }));
    };


    const handleSeatSelection = (seatNumber) => {
        const isSelected = selectedSeats.includes(seatNumber);
        let newSelectedSeats;

        if (isSelected) {
            newSelectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        } else if (selectedSeats.length < bookingData.noOfTickets) {
            newSelectedSeats = [...selectedSeats, seatNumber];
        } else {
            toast.error(`You can only select ${bookingData.noOfTickets} seats`)
            return; // Max seats already selected
        }
        setSelectedSeats(newSelectedSeats);
        setBookingData(prev => ({ ...prev, seatNumbers: newSelectedSeats }));
    };

    const calculateTotalPrice = () => {
        const taxes = 1008;
        let total = 0;
        for (let seat of selectedSeats) {

            const actualSeat = seats.find((s) => s.seatNumber === seat)
            if (actualSeat) {
                total = total + actualSeat.price + taxes;
            }
        }

        return total;
    };

    const getSeatPrice = () => {
        selectedSeats.reduce((total, seatNumber) => {
            const seat = seats.find(s => s.seatNumber === seatNumber);
            return total + (seat ? seat.price : 0);
        }, 0).toLocaleString()
    }

    const handleBookingSubmit = () => {
        if (!bookingData.scheduleId) {
            toast.error("Schedule ID is missing.");
            return;
        }

        if (!bookingData.noOfTickets || bookingData.noOfTickets <= 0) {
            toast.error("Number of tickets must be greater than 0.");
            return;
        }

        if (!Array.isArray(bookingData.passengers) || bookingData.passengers.length === 0) {
            toast.error("At least one passenger is required.");
            return;
        }

        for (let i = 0; i < bookingData.passengers.length; i++) {
            const passenger = bookingData.passengers[i];
            if (!passenger.name || !passenger.age || !passenger.gender) {
                toast.error(`Passenger ${i + 1} has incomplete information.`);
                return;
            }
        }

        if (!bookingData.seatNumbers || bookingData.seatNumbers.length !== bookingData.noOfTickets) {
            toast.error("Please select valid seat numbers.");
            return;
        }

        navigate("/customer/payment", {state: { 'bookingData': bookingData, 'totalPrice': calculateTotalPrice() }})
        toast.success('Going to payment!!');

    }

    // Loading state
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-4">
                <BookingHeader isBookingPage={true}  />
                <div className="row g-4">
                    <div className="col-lg-8">
                        {/* Flight Summary */}
                        <FlightSummary schedule={schedule} formatDateTime={formatDateTime} formatTime={formatTime} />
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Passenger Details</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <label className="form-label">Number of Passengers</label>
                                    <select
                                        className="form-select"
                                        value={bookingData.noOfTickets}
                                        onChange={(e) => onPassengerCountChange(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <option key={num} value={num}>{num} Adult{num > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* Passenger Form */}
                                {
                                    bookingData.passengers.map((p, index) => (
                                        <div className="border rounded p-3 mb-3">
                                            <h6 className="mb-3">Passenger {index + 1}</h6>
                                            <div className="row g-3">
                                                <div className="col-md-8">
                                                    <label className="form-label">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter full name"
                                                        onChange={handlePassengerChange(index, "name")}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="form-label">Age</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Age"
                                                        onChange={handlePassengerChange(index, "age")}
                                                    />
                                                </div>
                                                <div className="col-md-2">
                                                    <label className="form-label">Gender</label>
                                                    <select
                                                        className="form-select"
                                                        onChange={handlePassengerChange(index, "gender")}
                                                    >
                                                        <option value="MALE">Male</option>
                                                        <option value="FEMALE">Female</option>
                                                        <option value="OTHER">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>

                        {/* Seat Mapping based on the API */}
                        <SeatSelection
                            selectedSeats={selectedSeats}
                            maxSeats={bookingData.noOfTickets}
                            onSeatSelect={handleSeatSelection}
                            seats={seats}
                            loading={loading}
                        />

                    </div>

                    <div className="col-lg-4">
                        {/* Price Summary */}
                        <div className="card sticky-top" style={{ top: '24px' }}>
                            <div className="card-header">
                                <h5 className="card-title mb-0">Price Summary</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between mb-2">
                                        <small className="text-muted">
                                            Base fare ({bookingData.noOfTickets} traveller{bookingData.noOfTickets > 1 ? 's' : ''})
                                        </small>
                                        <small className="fw-medium">₹{(calculateTotalPrice().toLocaleString())}</small>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <small className="text-muted">Taxes and fees</small>
                                        <small className="fw-medium">₹{(1008 * bookingData.noOfTickets).toLocaleString()}</small>
                                    </div>
                                    {selectedSeats.length > 0 && (
                                        <div className="d-flex justify-content-between mb-2">
                                            <small className="text-muted">Seat selection</small>
                                            <small className="fw-medium">
                                                ₹{getSeatPrice()}
                                            </small>
                                        </div>
                                    )}
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">Total price</h6>
                                        <h6 className="mb-0">₹{calculateTotalPrice()}</h6>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={handleBookingSubmit}
                                    disabled={selectedSeats.length !== bookingData.noOfTickets}
                                    to="/customer/payment"
                                    
                                >
                                    Continue to Payment
                                </button>

                                {selectedSeats.length !== bookingData.noOfTickets && (
                                    <small className="text-muted d-block text-center mt-2">
                                        Please select {bookingData.noOfTickets} seat{bookingData.noOfTickets > 1 ? 's' : ''} to continue
                                    </small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;







