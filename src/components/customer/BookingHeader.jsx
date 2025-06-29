import React from 'react'

const BookingHeader = () => {
  return (
     <div className="mb-4">
        <h2 className="mb-3">Complete your booking</h2>
        <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2 bg-primary text-white px-3 py-2 rounded-pill">
                <span className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px', fontSize: '12px' }}>1</span>
                <small className="fw-medium">Review & Book</small>
            </div>
            <div style={{ width: '32px', height: '1px', backgroundColor: '#dee2e6' }}></div>
            <div className="d-flex align-items-center gap-2 bg-light text-muted px-3 py-2 rounded-pill border">
                <span className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '20px', height: '20px', fontSize: '12px' }}>2</span>
                <small>Payment</small>
            </div>
        </div>
    </div>
  )
}

export default BookingHeader