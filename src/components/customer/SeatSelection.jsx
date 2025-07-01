import React from 'react'

const SeatSelection = ({ selectedSeats, maxSeats, onSeatSelect, seats, loading }) => {
    //    Generating rows for seat mapping
    const generateRowsMap = () => {
        const rows = {};

        seats.forEach(seat => {
            const rowNumber = seat.seatNumber.match(/\d+/)[0];

            if (!rows[rowNumber]) {
                rows[rowNumber] = [];
            }
            rows[rowNumber].push(seat);
        })

        return rows;

    };

    // Returning color classe based on the selection
    const getSeatButtonClass = (seat) => {
        if (selectedSeats.includes(seat.seatNumber)) {
            return 'btn btn-primary btn-sm';
        }
        if (seat.seatStatus === "BOOKED") {
            return "btn btn-secondary btn-sm"
        }
        if(seat.seatStatus === "HOLD"){
            return "btn btn-warning btn-sm"
        }
        return 'btn btn-success btn-sm'
    }

    if (loading) {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Select Seats</h5>
                </div>
                <div className="card-body text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading seats...</p>
                </div>
            </div>
        );
    }
    if (!seats || seats.length === 0) {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <h5>Select Seats</h5>
                </div>
                <div className="card-body">
                    <p>No seats available</p>
                </div>
            </div>
        );
    }

    const seatRows = generateRowsMap();
    const rowNumbers = Object.keys(seatRows).sort((a, b) => parseInt(a) - parseInt(b));

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="card-title mb-1">Select Seats</h5>
                <small className="text-muted">
                    Selected: {selectedSeats.length} of {maxSeats} seats
                </small>
            </div>
            <div className="card-body">
                {/* Showing the seat status colors*/}
                <div className='row mb-3'>
                    <div className='col-12'>

                        <div className='d-flex justify-content-center gap-4'>

                            <div className='d-flex align-items-center'>
                                <div className='btn btn-success btn-sm me-2' style={{ width: '20px', height: '20px' }}>
                                </div>
                                <small>Available</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="btn btn-primary btn-sm me-2" style={{ width: '20px', height: '20px' }}></div>
                                <small>Selected</small>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="btn btn-secondary btn-sm me-2" style={{ width: '20px', height: '20px' }}></div>
                                <small>Occupied</small>
                            </div>

                        </div>

                    </div>

                </div>
                {/* Showing Seats */}
                <div className='bg-light p-3 rounded'>
                    <div className='text-center mb-3'>
                        <small className='text-muted'>Front Deck</small>
                    </div>

                    {
                        rowNumbers.map(rowNumber => {
                            const rowSeats = seatRows[rowNumber];

                            return (
                                <div key={rowNumber} className='d-flex justify-content-center mb-2'>

                                    <div className='d-flex align-items-center gap-2'>
                                        <div style={{ width: '30px' }} className='text-center'>
                                            <small>{rowNumber}</small>
                                        </div>
                                    </div>

                                    {/* Showing the Actual seats with the last letters*/}

                                    <div className='d-flex gap-1'>
                                        {

                                            rowSeats.map(seat => {
                                                const canSelect = seat.seatStatus === "AVAILABLE";
                                                const seatLetter = seat.seatNumber.slice(-1);



                                                return (
                                                    <>


                                                        <button
                                                            key={seat.seatNumber}
                                                            className={getSeatButtonClass(seat)}
                                                            style={{ width: '35px', height: '35px' }}
                                                            onClick={() => canSelect && onSeatSelect(seat.seatNumber)}
                                                            disabled={!canSelect}
                                                            title={`Seat: ${seat.seatNumber} - ₹${seat.price} (${seat.seatClassType})`}
                                                        >
                                                            {seatLetter}
                                                        </button>

                                                        {((seat.seatClassType === "FIRST" && seatLetter === 'A') || (seat.seatClassType === "BUSINESS" && seatLetter === 'B') || (seat.seatClassType === "ECONOMY" && seatLetter === 'C')) && (
                                                            <div style={{ width: '30px' }} className="text-center">
                                                                <small className="text-muted">aisle</small>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            })
                                        }

                                    </div>


                                </div>
                            )
                        })
                    }
                </div>



            </div>
        </div>
    );
};

export default SeatSelection