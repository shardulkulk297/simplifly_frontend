import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { unparse } from 'papaparse';
import { useLocation } from 'react-router-dom'

const GetBookings = () => {
  const location = useLocation();
  const scheduleId = location.state.scheduleId;
  console.log(scheduleId);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/booking/getBookingsBySchedule/${scheduleId}`, {
          headers: { 'Authorization': "Bearer " + localStorage.getItem('token') }
        });
        console.log(response.data);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, [])

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusClass = status === 'CONFIRMED' ? 'success' :
      status === 'PENDING' ? 'warning' :
        status === 'CANCELLED' ? 'danger' : 'secondary';
    return `badge bg-${statusClass}`;
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const downloadCSV = () => {
    const data = bookings.map(b => ({
      bookingId: b.bookingId,
      flightNumber: b.flightNumber,
      route: b.route ? `${b.route.origin} to ${b.route.destination}` : '',
      departureTime: b.departureTime,
      arrivalTime: b.arrivalTime,
      bookedBy: b.bookedBy,
      passengers: (b.passengerNames || []).map(p => p.fullName || p.name || p).join(';'),
      seats: (b.seatNumbers || []).join(';'),
      totalPrice: b.totalPrice,
      bookingStatus: b.bookingStatus,
    }));

    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bookings_${scheduleId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-end mb-2">

        <button className="btn btn-outline-primary" onClick={downloadCSV}>
          Download CSV
        </button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Flight Bookings</h5>
            </div>
            <div className="card-body p-0">
              {bookings.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">No bookings found for this schedule.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Flight</th>
                        <th scope="col">Route</th>
                        <th scope="col">Departure</th>
                        <th scope="col">Arrival</th>
                        <th scope="col">Booked By</th>
                        <th scope="col">Passengers</th>
                        <th scope="col">Seats</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.bookingId}>
                          <td className="fw-bold">{booking.bookingId}</td>
                          <td>{booking.flightNumber}</td>
                          <td>
                            {booking.route ?
                              `${booking.route.origin} → ${booking.route.destination}` :
                              'N/A'
                            }
                          </td>
                          <td>{formatTime(booking.departureTime)}</td>
                          <td>{formatTime(booking.arrivalTime)}</td>
                          <td>{booking.bookedBy}</td>
                          <td>
                            <div className="passenger-list">
                              {booking.passengerNames && booking.passengerNames.length > 0 ? (
                                booking.passengerNames.map((passenger, index) => (
                                  <small key={index} className="d-block text-muted">
                                    {passenger.fullName || passenger.name || passenger}
                                  </small>
                                ))
                              ) : (
                                <small className="text-muted">No passengers</small>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="seat-numbers">
                              {booking.seatNumbers && booking.seatNumbers.length > 0 ? (
                                booking.seatNumbers.map((seat, index) => (
                                  <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                    {seat}
                                  </span>
                                ))
                              ) : (
                                <small className="text-muted">No seats</small>
                              )}
                            </div>
                          </td>
                          <td className="fw-bold">₹{booking.totalPrice}</td>
                          <td>
                            <span className={getStatusBadge(booking.bookingStatus)}>
                              {booking.bookingStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetBookings