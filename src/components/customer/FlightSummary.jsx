import React from 'react'

const FlightSummary = ({ schedule, formatDateTime, formatTime }) => {
    return (
        <div className="card mb-4">
            <div className="card-header">
                <h5 className="card-title mb-0">Flight Details</h5>
            </div>
            { schedule && (
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h6 className="text-primary mb-1">{schedule.flight?.flightNumber}</h6>
                            <small className="text-muted d-block">{schedule.flight?.owner.companyName}</small>
                        </div>
                        <div className="text-end">
                            <h6 className="mb-1">{schedule.flight?.route.origin} → {schedule.flight?.route.destination}</h6>
                            <small className="text-muted">{formatDateTime(schedule?.departureTime)}</small>
                        </div>
                    </div>

                    <div className="bg-light rounded p-3">
                        <div className="row align-items-center">
                            <div className="col-4 text-center">
                                <h4 className="mb-0">{formatTime(schedule?.departureTime)}</h4>
                                <small className="fw-bold text-muted">{schedule.flight?.route.origin?.slice(0, 3).toUpperCase()}</small>
                                <div><small className="text-muted">{schedule.flight?.route.origin}</small></div>
                            </div>
                            <div className="col-4 text-center">
                                <small className="text-muted d-block mb-2">{schedule.flight?.route.duration}</small>
                                <hr className="my-0" style={{ position: 'relative' }} />
                                <div style={{
                                    position: 'absolute', left: '50%', transform: 'translateX(-50%) translateY(-50%)',
                                    width: '8px', height: '8px', backgroundColor: '#007bff', borderRadius: '50%', marginTop: '-4px'
                                }}></div>
                                <small className="text-muted mt-2 d-block">Non-stop</small>
                            </div>
                            <div className="col-4 text-center">
                                <h4 className="mb-0">{formatTime(schedule?.arrivalTime)}</h4>
                                <small className="fw-bold text-muted">{schedule.flight?.route.destination?.slice(0, 3).toUpperCase()}</small>
                                <div><small className="text-muted">{schedule.flight?.route.destination}</small></div>
                            </div>
                        </div>
                    </div>

                </div>)
            }
        </div>
    )
}

export default FlightSummary