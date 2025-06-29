import axios from 'axios'
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ViewBookings = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/booking/getBookings", {
                    headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
                })
                console.log(response.data);
                const sortedBookings = response.data.sort((a, b) => b.bookingId - a.bookingId);
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

    const handleCancel = async (bookingId) => {
        try {
            
            const response = await axios.put(`http://localhost:8080/api/booking/cancelBooking/${bookingId}`, null,{
                headers:{'Authorization': "Bearer " + localStorage.getItem('token')}
            })
            console.log(response.data);
            toast.success(response.data);
            window.location.reload();
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleDownload = (booking) => {
        const doc = new jsPDF();


        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Flight Ticket', 105, 20, null, null, 'center');

        let y = 40;


        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Flight Information', 20, y);
        y += 10;

        doc.setFont('helvetica', 'normal');
        doc.text(`Flight Number: ${booking.flightNumber}`, 20, y);
        y += 8;
        doc.text(`Route: ${booking.route.origin} to ${booking.route.destination}`, 20, y);
        y += 8;
        doc.text(`Departure: ${formatDateTime(booking.departureTime)}`, 20, y);
        y += 8;
        doc.text(`Arrival: ${formatDateTime(booking.arrivalTime)}`, 20, y);
        y += 15;


        doc.setFont('helvetica', 'bold');
        doc.text('Passenger Information', 20, y);
        y += 10;

        doc.setFont('helvetica', 'normal');
        if (booking.passengerNames && booking.passengerNames.length > 0) {
            booking.passengerNames.forEach((passenger, index) => {
                doc.text(`${index + 1}. ${passenger.name} (Age: ${passenger.age}, Gender: ${passenger.gender})`, 20, y);
                y += 8;
            });
        }
        y += 7;
        // Seat information
        doc.setFont('helvetica', 'bold');
        doc.text('Seat Information', 20, y);
        y += 10;

        doc.setFont('helvetica', 'normal');
        doc.text(`Seats: ${booking.seatNumbers.join(', ')}`, 20, y);
        y += 15;

        // Booking details
        doc.setFont('helvetica', 'bold');
        doc.text('Booking Details', 20, y);
        y += 10;

        doc.setFont('helvetica', 'normal');
        doc.text(`Status: ${booking.bookingStatus}`, 20, y);
        y += 8;
        doc.text(`Total Amount Paid: ₹${booking.totalPrice}`, 20, y);


        doc.save(`ticket_${booking.flightNumber}.pdf`);
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
                                            <p><strong>Seats Booked: </strong>
                                                <span className='text-primary'>
                                                    {Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : booking.seatNumbers}
                                                </span>
                                            </p>
                                            {/* Properly formatted passengers */}
                                            <div className='mb-3'>
                                                <strong>Passengers: </strong>
                                                <div className='mt-2'>
                                                    {booking.passengerNames && booking.passengerNames.map((passenger, index) => (
                                                        <div key={index} className='mb-1 ms-3'>
                                                            <span className='text-primary'>
                                                                <strong>{index + 1}. {passenger.name}</strong>
                                                                {passenger.age && <span className='text-muted'> (Age: {passenger.age})</span>}
                                                                {passenger.gender && <span className='text-muted'> - {passenger.gender}</span>}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <button className='btn btn-danger me-2' onClick={() => handleCancel(booking.bookingId)}>Cancel</button>
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