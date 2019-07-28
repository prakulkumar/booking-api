import React, { Component } from 'react';

class Booking extends Component {

    state = {
        validated: false,
        hotelBookingForm: {
            step: 1,
            firstName: '',
            lastName: '',
            address: '',
            checkIn: '',
            checkOut: '',
            adults: '',
            children: 0,
            contactNumber: '',
            rooms: [],
            amount: '',
            advance: ''
        },
        cancel: false,
        checkedIn: false,
        checkedOut: false,
        availableRooms: [],
        formIsValid: true,
        isEdit: false,
        bookingId: null,
        personId: null,
        disable: false,
        misc: '',
        total: '',
        balance: '',
        status: ''
    }

    render() {
        return <React.Fragment>
            Hello I can Book your room
        </React.Fragment>
    }
}

export default Booking;