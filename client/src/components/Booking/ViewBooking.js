import React from 'react';
const dateFNS = require('date-fns');

const viewBooking = (props) => {
    const booking = props.booking;
    console.log(11, dateFNS.format(new Date(booking.checkIn), 'MMMM d, yyyy'));
    return (
        <div className="bookingDetails__container">
            <div className="bookingDetails__info">
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">First Name</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.firstName}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Last Name</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.lastName}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Address</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.address}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Check In</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{dateFNS.format(new Date(booking.checkIn), 'MMM DD, YYYY')}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Check Out</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{dateFNS.format(new Date(booking.checkOut), 'MMM DD, YYYY')}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Adults</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.adults}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Children</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.children}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Contact No.</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.contactNumber}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Total rooms books</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{booking.rooms.length}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Room Charges</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">Rs. {booking.amount}</span>
                </div>
            </div>
        </div>
    );
};

export default viewBooking;