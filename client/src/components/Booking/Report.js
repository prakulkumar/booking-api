import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import './Report.css';
import dateFNS from 'date-fns';

const Report = ({ booking }) => {
    console.log('I am Here ', booking);
    return (
        <React.Fragment>
            <div className="report__container">
                <div className="report__section">
                    <div className="report-row">
                        <span className="report-key">Booking Id</span>
                        <span className="report-value">{booking.bookingId}</span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">Booking Date</span>
                        <span className="report-value"></span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">Hotel Name</span>
                        <span className="report-value">Delight Hotel</span>
                    </div>
                </div>
                <div className="report__section">
                    <div className="report-row">
                        <span className="report-key">Name</span>
                        <span className="report-value">Mr. {booking.hotelBookingForm.firstName} {booking.hotelBookingForm.lastName}</span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">Contact Number</span>
                        <span className="report-value">{booking.hotelBookingForm.contactNumber}</span>
                    </div>
                </div>
                <div className="report__section">
                    <div className="report-row">
                        <span className="report-key">Check In</span>
                        <span className="report-value">{dateFNS.format(booking.hotelBookingForm.checkIn, 'MM/DD/YYYY')}</span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">Check In Time</span>
                        <span className="report-value"></span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">Check Out</span>
                        <span className="report-value">{dateFNS.format(booking.hotelBookingForm.checkOut, 'MM/DD/YYYY')}</span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">Check Out Time</span>
                        <span className="report-value"></span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">No of Rooms</span>
                        <span className="report-value"></span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">No of Guests</span>
                        <span className="report-value"></span>
                    </div>
                    <div className="report-row">
                        <span className="report-key">No of Nights</span>
                        <span className="report-value"></span>
                    </div>
                </div>
                {/* <div className="report__section">
                    {booking.hotelBookingForm.rooms.map(() => {
                        <React.Fragment>
                            <div className="report-row">
                                <span className="report-key">Booking Id</span>
                                <span className="report-value">{booking.bookingId}</span>
                            </div>
                        </React.Fragment>
                    })}
                </div> */}
            </div>
            <Modal.Footer>
                <Button variant="primary">Done</Button>
            </Modal.Footer>
        </React.Fragment>
    )
}

export default Report
