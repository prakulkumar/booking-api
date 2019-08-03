import React, { Component } from 'react';
import BookingForm from './BookingForm';

import axios from 'axios';

const roomTypes = ['AC', 'Non AC', 'Deluxe', 'Suite', 'Dormitory'];

class Booking extends Component {

    state = {
        validated: false,
        hotelBookingForm: {
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

    componentDidMount() {
        console.log(this.props);
        let disable = false;
        if (this.props.status === 'viewBooking') {
            let data = this.props.detailsForForm.booking;
            let form = {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                checkIn: new Date(data.checkIn),
                checkOut: new Date(data.checkOut),
                adults: data.adults,
                children: data.children,
                contactNumber: data.contactNumber,
                rooms: data.rooms,
                amount: data.amount,
                advance: data.advance
            }

            this.setState({
                hotelBookingForm: form,
                disable: true,
                bookingId: data._id,
                misc: data.misc,
                balance: data.balance,
                cancel: data.cancel,
                checkedIn: data.checkedIn,
                checkedOut: data.checkedOut,
                status: this.props.status
            });

            this.getAvailableRooms(new Date(data.checkIn), new Date(data.checkOut));
        } else {
            let updatedForm = { ...this.state.hotelBookingForm };
            updatedForm['checkIn'] = new Date();
            this.setState({
                hotelBookingForm: updatedForm,
                status: this.props.status
            });
        }
    }

    inputChangedHandler = (event) => {
        let updatedForm = { ...this.state.hotelBookingForm };
        if (event.isDate) {
            updatedForm[event.name] = event.event;
            this.setState({ hotelBookingForm: updatedForm });
            if (event.name === 'checkIn') {
                updatedForm['checkOut'] = '';
                updatedForm.rooms = [];
                this.setState({ hotelBookingForm: updatedForm });
            }
            if (event.name === 'checkOut') {
                updatedForm.rooms = [];
                this.setState({ hotelBookingForm: updatedForm });
                this.getAvailableRooms(this.state.hotelBookingForm.checkIn, event.event);
            }
        }
        else {
            updatedForm[event.target.name] = event.target.name === 'firstName' || event.target.name === 'lastName' ? event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1) : event.target.value;
            this.setState({ hotelBookingForm: updatedForm });
        }
    }

    roomDetailsChangedHandler = (event, name, index) => {
        let updatedForm = { ...this.state.hotelBookingForm };
        let updatedRooms = [...updatedForm.rooms];
        if (event.target.name === "roomType") {
            updatedRooms[index] = { 'roomType': event.target.value };
        }
        if (event.target.name === "roomNumber") {
            updatedRooms[index] = this.state.availableRooms.filter(room => room.roomNumber === event.target.value)[0];
        }
        updatedForm.rooms = updatedRooms;
        this.setState({ hotelBookingForm: updatedForm });
    }

    // get the available rooms between checkin date and checkout date
    getAvailableRooms = (checkIn, checkOut) => {
        axios.post('/rooms/available', { checkIn, checkOut, bookingId: this.state.bookingId })
            .then(res => {
                console.log('new api', res.data);
                let availableRooms = res.data;
                let rooms = this.props.rooms.filter((room) => {
                    return this.state.hotelBookingForm.rooms.indexOf(room._id) >= 0;
                });
                let updatedForm = { ...this.state.hotelBookingForm };
                updatedForm.rooms = rooms;
                availableRooms = availableRooms.concat(rooms);
                this.setState({ availableRooms, hotelBookingForm: updatedForm });
                if (this.state.hotelBookingForm.rooms.length === 0) { this.setDefaultRoom() };
            }).catch(error => console.log(error));
    }

    setDefaultRoom = () => {
        let tempObj;
        let room = this.state.availableRooms.filter(room => room._id === this.props.detailsForForm.roomId);
        room.length > 0 ? tempObj = room[0] : tempObj = this.state.availableRooms[0];
        let updatedForm = { ...this.state.hotelBookingForm };
        let updatedRooms = [...updatedForm.rooms];
        updatedRooms.push(tempObj);
        updatedForm.rooms = updatedRooms;
        this.setState({ hotelBookingForm: updatedForm });
    }

    addRoom = () => {
        let updatedForm = { ...this.state.hotelBookingForm };
        let updatedRooms = [...updatedForm.rooms];
        updatedRooms.push({});
        updatedForm.rooms = updatedRooms;
        this.setState({ hotelBookingForm: updatedForm });
    }

    deleteRoom = (index) => {
        let updatedForm = { ...this.state.hotelBookingForm };
        let rooms = [...updatedForm.rooms]
        let updatedRooms = rooms.filter((room, i) => i !== index);
        updatedForm.rooms = updatedRooms;
        this.setState({ hotelBookingForm: updatedForm });
    }

    closeModalHandler = () => {
        this.setState({ validated: false });
        this.clearForm();
        this.props.onClose();
    }

    clearForm = () => {
        let updatedForm = { ...this.state.hotelBookingForm };
        for (let element in updatedForm) {
            let updatedFormElement = { ...updatedForm[element] }
            if (element === 'rooms') {
                updatedFormElement = [];
            } else {
                updatedFormElement = '';
            }
            updatedForm[element] = updatedFormElement;
        }
        this.setState({ hotelBookingForm: updatedForm });
    }

    hotelBookedHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            console.log('valid')
        }
        this.setState({ validated: true });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.hotelBookingForm.checkIn !== '' ? (
                    <BookingForm
                        hotelBookingForm={this.state.hotelBookingForm}
                        onChanged={(event) => this.inputChangedHandler(event)}
                        onRoomChanged={(event, name, index) => { this.roomDetailsChangedHandler(event, name, index) }}
                        roomTypes={roomTypes}
                        availableRooms={this.state.availableRooms}
                        addRoom={this.addRoom}
                        deleteRoom={this.deleteRoom}
                        onBooked={(event) => this.hotelBookedHandler(event)}
                        validated={this.state.validated}
                        onClose={this.props.onClose}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

export default Booking;