import axios from 'axios'
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'

const ViewBookings = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/booking/getBookings", {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                })
                console.log(response.data);
                const sortedBookings = response.data.sort((a, b) => b.id - a.id);
                setBookings(sortedBookings);

            } catch (error) {
                console.log(error);
            }
        }
        fetchBookings();
    }, [])

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

    const handleCancel = async () => {


    }

    const handleDownload = (booking) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('FLIGHT TICKET', 105, 20, null, null, 'center');

        doc.setFontSize(12);
        doc.text(`Flight: ${booking.flightNumber}`, 20, 40);
        doc.text(`Route: ${booking.route.origin} → ${booking.route.destination}`, 20, 50);
        doc.text(`Departure: ${formatDateTime(booking.departureTime)}`, 20, 60);
        doc.text(`Arrival:   ${formatDateTime(booking.arrivalTime)}`, 20, 70);
        doc.text(`Passengers: ${booking.passengerNames.map(p => p.name).join(', ')}`, 20, 100);
        doc.text(`Seats: ${booking.seatNumbers.join(', ')}`, 20, 110);
        doc.text(`Status: ${booking.bookingStatus}`, 20, 120);
        doc.text(`Total Paid: ₹${booking.totalPrice}`, 20, 130);

        doc.save(`ticket_${booking.id}.pdf`);
    };

    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">


                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="card-title mb-0">View Bookings</h5>
                            </div>

                            {bookings &&
                                bookings.map((booking, index) => (
                                    <div key={index} className="card-body">

                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <h6 className="text-primary mb-1">{booking.flightNumber}</h6>
                                            </div>
                                            <div className="text-end">
                                                <h6 className="mb-1">{booking.route.origin} → {booking.route.destination}</h6>
                                                <small className="text-muted">{formatDateTime(booking.departureTime)}</small>
                                            </div>
                                        </div>

                                        <div className="bg-light rounded p-3">
                                            <div className="row align-items-center">
                                                <div className="col-4 text-center">
                                                    <h4 className="mb-0">{formatTime(booking.departureTime)}</h4>
                                                    <small className="fw-bold text-muted">{booking.route.origin.slice(0, 3).toUpperCase()}</small>
                                                    <div><small className="text-muted">{booking.route.origin}</small></div>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <small className="text-muted d-block mb-2">{booking.route.duration}</small>
                                                    <hr className="my-0" style={{ position: 'relative' }} />
                                                    <div style={{
                                                        position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(-50%)',
                                                        width: '8px', height: '8px', backgroundColor: '#007bff', borderRadius: '50%', marginTop: '-4px'
                                                    }}></div>
                                                    <small className="text-muted mt-2 d-block">Non-stop</small>
                                                </div>
                                                <div className="col-4 text-center">
                                                    <h4 className="mb-0">{formatTime(booking.arrivalTime)}</h4>
                                                    <small className="fw-bold text-muted">{booking.route.destination.slice(0, 3).toUpperCase()}</small>
                                                    <div><small className="text-muted">{booking.route.destination}</small></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12 m-2'>
                                            <p><strong>Booking Status:</strong> <strong className={`${booking.bookingStatus === "CONFIRMED" ? 'text-success' : 'text-danger'} text-primary`}>{booking.bookingStatus}</strong> </p>
                                            <p><strong>Booked By: </strong> <strong className='text-primary'>{(booking.bookedBy).toUpperCase()}</strong></p>
                                            <p><strong>Ticket Price: </strong> <strong className='text-primary'>{(booking.totalPrice)}</strong></p>
                                            <p><strong>Seats Booked: </strong> {booking.seatNumbers}</p>
                                            <button className='btn btn-danger me-2' onClick={() => handleCancel()}>Cancel</button>
                                            <button onClick={() => handleDownload(booking)} className='btn btn-success me-2'>Download</button>
                                        </div>

                                    </div>



                                ))
                            }


                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewBookings