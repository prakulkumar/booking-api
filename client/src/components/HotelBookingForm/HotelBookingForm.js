import React, { Component } from 'react';

import { Button, Modal, Form, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import './HotelBookingForm.css';
import "react-datepicker/dist/react-datepicker.css";

import dateFNS from 'date-fns';
import axios from 'axios';

const roomTypes = ['AC', 'Non AC', 'Deluxe', 'Suite', 'Dormitory'];

class HotelBookingForm extends Component {

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
            advance: '',
            cancel: false,
            checkedIn: false
        },
        availableRooms: [],
        formIsValid: true,
        isEdit: false,
        bookingId: null,
        personId: null,
        disable: false,
        misc: '',
        total: '',
        balance: '',
        status: '',
    }

    componentDidMount() {
        if (this.props.showModal) {
            console.log('%c props', 'color: red', this.props)
            let disable = false;
            if (this.props.status === 'viewBooking') {
                disable = true;
            }
            let updatedForm = { ...this.state.hotelBookingForm };
            updatedForm.checkIn = this.props.detailsForForm.date;
            // ------ for testing --------
            let room = this.props.rooms.filter(room => room._id === this.props.detailsForForm.roomId);
            updatedForm.rooms.push(room[0]);
            this.setState({ hotelBookingForm: updatedForm, disable, status: this.props.status, availableRooms: this.props.rooms });
            // ---------------------------

            // ------ use this instead--------
            // this.setState({ hotelBookingForm: updatedForm, disable, status: this.props.status });
            // -------------------------------
            // console.log(this.state);

            // when clicked to view the booking details
            if (this.props.status === 'viewBooking') {
                let data = this.props.detailsForForm.booking;
                let form = {
                    step: 1,
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
                    advance: data.advance,
                    cancel: data.cancel,
                    checkedIn: data.checkedIn
                }

                this.setState({
                    hotelBookingForm: form,
                    bookingId: data.bookingId,
                    misc: data.misc,
                    balance: data.balance
                });

                // this.getAvailableRooms(new Date(data.checkOut));
            }
        }
    }

    getPersonDetailsForm = () => (
        <React.Fragment>
            <Form.Row>
                <Form.Group as={Col} controlId="formPlaintext" className="display-flex">
                    <Form.Control
                        title="First Name"
                        type="text"
                        placeholder="First Name"
                        value={this.state.hotelBookingForm.firstName}
                        name="firstName"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        className="valueCapitalize"
                        required />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} controlId="formPlaintext" className="display-flex">
                    <Form.Control
                        title="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={this.state.hotelBookingForm.lastName}
                        name="lastName"
                        className="valueCapitalize"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        required />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formPlaintextarea" className="display-flex">
                    <Form.Control
                        title="Address"
                        as="textarea"
                        rows="3"
                        placeholder="Address"
                        value={this.state.hotelBookingForm.address}
                        name="address"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        required />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formPlainCalendar" className="display-flex">
                    <DatePicker
                        title="Check In"
                        selected={this.state.hotelBookingForm.checkIn}
                        onSelect={(event) => this.inputChangedHandler({ event, name: "checkIn", isDate: true })}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Check In"
                        minDate={new Date()}
                        key="checkIn"
                        className="form-control"
                        disabled={!this.state.isEdit && this.state.disable}
                        required
                    />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} controlId="formPlaintCalendar" className="display-flex">
                    <DatePicker
                        title="Check Out"
                        selected={this.state.hotelBookingForm.checkOut}
                        onSelect={(event) => this.inputChangedHandler({ event, name: "checkOut", isDate: true })}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Check Out"
                        minDate={this.state.hotelBookingForm.checkIn}
                        key="checkOut"
                        className="form-control"
                        disabled={!this.state.isEdit && this.state.disable}
                        required
                    />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="3" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Adults"
                        type="number"
                        placeholder="Adults"
                        value={this.state.hotelBookingForm.adults}
                        name="adults"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        min="1"
                        required />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Children"
                        type="number"
                        placeholder="Children"
                        value={this.state.hotelBookingForm.children}
                        name="children"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        min="0"
                        required />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Contact Number"
                        type="number"
                        placeholder="Contact Number"
                        value={this.state.hotelBookingForm.contactNumber}
                        name="contactNumber"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        required />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
        </React.Fragment>
    )

    getRoomDetailsForm = () => {

        return (
        <React.Fragment>
            <Form.Row>
                <Form.Group as={Col} md="5" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Total Amount"
                        type="number"
                        placeholder="Total Amount"
                        value={this.state.hotelBookingForm.amount}
                        name="amount"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        min="1"
                        required></Form.Control>
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Advance"
                        type="number"
                        placeholder="Advance"
                        value={this.state.hotelBookingForm.advance}
                        name="advance"
                        onChange={(event) => this.inputChangedHandler(event)}
                        disabled={!this.state.isEdit && this.state.disable}
                        min="0"
                        required></Form.Control>
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="2" className="icon" className="display-flex">
                    <Button variant="outline-primary"
                        className="btn-no-border btn-no-border--primary addIcon"
                        type="button" onClick={this.addRoom}
                        disabled={!this.state.isEdit && this.state.disable} title="Add Room">
                        <i className="fa fa-plus pointerCursor icon-medium"></i>
                    </Button>
                </Form.Group>
            </Form.Row>
            <div className="room-details-form">
                {
                    this.state.hotelBookingForm.rooms.map((room, index) => {
                        return (
                            <Form.Row key={index}>
                                <Form.Group as={Col} md="5" controlId="formPlainSelect" className="display-flex">
                                    <Form.Control
                                        as="select" title="Room Type"
                                        value={this.state.hotelBookingForm.rooms[index].roomType}
                                        name="roomType"
                                        onChange={(event) => this.roomDetailsChangedHandler(event, "roomType", index)}
                                        disabled={!this.state.isEdit && this.state.disable}
                                        required >
                                        <option value='' hidden>Room Type</option>
                                        {roomTypes.map((roomType, i) => {
                                            return <option key={`roomType${i}`}>{roomType}</option>
                                        })}
                                    </Form.Control>
                                    <span className="required">*</span>
                                </Form.Group>
                                <Form.Group as={Col} md="5" controlId="formPlainSelect" className="display-flex">
                                    <Form.Control
                                        as="select" title="Room No"
                                        value={this.state.hotelBookingForm.rooms[index].roomNumber}
                                        name="roomNumber"
                                        onChange={(event) => this.roomDetailsChangedHandler(event, "roomNumber", index)}
                                        disabled={!this.state.isEdit && this.state.disable}
                                        required >
                                        <option value='' hidden>Room No</option>
                                        {this.state.availableRooms.map((room, i) => {
                                            if (room.roomType === this.state.hotelBookingForm.rooms[index].roomType) {
                                                return <option key={`roomNo${i}`}>{room.roomNumber}</option>
                                            }
                                            return null;
                                        })}
                                    </Form.Control>
                                    <span className="required">*</span>
                                </Form.Group>
                                {index === 0 ? null : (
                                    <Form.Group as={Col} md="2" className="icon">
                                        <Button variant="outline-danger"
                                            className="btn-no-border btn-no-border--danger deleteIcon"
                                            type="button" onClick={this.addRoom}
                                            disabled={!this.state.isEdit && this.state.disable}
                                            title="Delete" onClick={() => this.deleteRoom(index)}>
                                            <i className="fa fa-trash-o pointerCursor icon-medium"></i>
                                        </Button>
                                    </Form.Group>
                                )}
                            </Form.Row>
                        )
                    })
                }
            </div>
            </React.Fragment>
        )
    }

    getAmountDetails = () => {
        return (
            <React.Fragment>
                <div className="amount-details">
                    <div className="amount-details__detail" >
                        <p>Total Amount:</p><p>{this.state.hotelBookingForm.amount}</p>
                    </div>
                    <div className="amount-details__detail">
                        <p>Advance:</p><p>{this.state.hotelBookingForm.advance}</p>
                    </div>
                    <div className="amount-details__detail">
                        <p>Misc:</p><p>{this.state.misc}</p>
                    </div>
                    <div className="amount-details__detail">
                        <p>Balance:</p><p>{this.state.balance}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    inputChangedHandler = (event) => {
        let updatedForm = { ...this.state.hotelBookingForm };
        if (event.isDate) {
            updatedForm[event.name] = event.event;
            this.setState({ hotelBookingForm: updatedForm });
            if (event.name === 'checkIn') {
                updatedForm['checkOut'] = '';
                this.setState({ hotelBookingForm: updatedForm });
            }
            if (event.name === 'checkOut') this.getAvailableRooms(this.state.hotelBookingForm.checkIn, event.event);
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

    hotelBookedHandler = (event) => {
        event.preventDefault();
        let bookingData = {};
        console.log(this.state.formIsValid)
        if (this.state.formIsValid) {
            for (let element in this.state.hotelBookingForm) {
                if (element === 'rooms') {
                    let rooms = this.state.hotelBookingForm[element].map(room => room._id);
                    bookingData[element] = rooms;
                }
                else bookingData[element] = this.state.hotelBookingForm[element];
            }
            delete bookingData.step;
    
            let url = '';
            if (this.state.isEdit && this.state.disable) {
                console.log('update');
                url = '/updateBookingDetails';
                bookingData['personId'] = this.state.personId;
                bookingData['bookingId'] = this.state.bookingId;
                bookingData['previousDepartureDate'] = this.state.previousDepartureDate;
                bookingData['previousArrivalDate'] = this.state.previousArrivalDate;
            }
            else { console.log('newbooking'); url = '/addBookingDetails' }
    
            console.log('booking data : ', bookingData);
    
            axios.post(url, bookingData)
                .then(res => {
                    console.log(res.data);
                    if (res.status === 200) this.props.handleBookings();
                }).catch(error => {
                    console.log(error);
                });
            this.props.onClose();
    
        }
    }

    checkValidity = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        let formIsValid = this.state.formIsValid && form.checkValidity();
        if (form.checkValidity()) {
            this.nextStep();
        }
        // else this.setState({ validated: true });
        this.setState({ validated: true, formIsValid });
    }

    getAvailableRooms = (checkIn, checkOut) => {
        axios.post('/rooms/available', { checkIn, checkOut })
            .then(res => {
                console.log(232323, res.data);
                // let data = res.data;
                // let rooms = [...this.state.hotelBookingForm.rooms];
                // this.setState({ availableRooms: data.concat(rooms) });
                // if (this.state.hotelBookingForm.rooms.length === 0) { this.setDefaultRoom(date) };
            }).catch(error => console.log(error));
        this.setState({ availableRooms: this.props.rooms });
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
        let updatedRooms = [...updatedForm.rooms]
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

    nextStep = () => {
        const updatedForm = { ...this.state.hotelBookingForm }
        updatedForm.step += 1;
        this.setState({ hotelBookingForm: updatedForm })
    }

    prevStep = () => {
        const updatedForm = { ...this.state.hotelBookingForm }
        updatedForm.step -= 1;
        this.setState({ hotelBookingForm: updatedForm })
    }

    edit = () => {
        this.setState({ isEdit: true, status: 'editBooking' });
    }

    cancelBooking = () => {
        console.log('cancel');
    }

    onCheckedIn = () => {
        console.log('checkedIn');
    }

    render() {
        const { step } = this.state.hotelBookingForm;
        let currentStepForm = null;
        let modalTitle = null;
        let footer = null;
        let headerButton = null;
        let closeButton = <Button variant="outline-dark" onClick={this.closeModalHandler}>Close</Button>
        switch (step) {
            case 1:
                modalTitle = <Modal.Title>Booking Details</Modal.Title>;
                currentStepForm = this.getPersonDetailsForm();
                break;
            case 2:
                modalTitle = <Modal.Title>Room Details</Modal.Title>;
                currentStepForm = this.getRoomDetailsForm();
                break;
            case 3:
                modalTitle = <Modal.Title>Amount Details</Modal.Title>;
                currentStepForm = this.getAmountDetails();
                break;

            default:
                modalTitle = <Modal.Title>Booking Details</Modal.Title>;
                currentStepForm = this.getPersonDetailsForm();
        }

        switch (this.state.status) {
            case 'newBooking':
                headerButton = null;
                footer = (
                    <Modal.Footer className="modal-footer">
                        {closeButton}
                        {this.state.hotelBookingForm.step === 1 ?
                            <Button variant="primary" type="submit"
                                disabled={this.state.hotelBookingForm.checkOut === ''}>Next
                            </Button> : null}
                        {this.state.hotelBookingForm.step === 2 ?
                            (<React.Fragment>
                                <Button variant="secondary" onClick={this.prevStep}>Previous</Button>
                                <Button variant="primary" onClick={(e) => this.hotelBookedHandler(e)}>Submit</Button>
                            </React.Fragment>) : null}
                    </Modal.Footer>
                )
                break;

            case 'viewBooking':
                headerButton = (
                    <div>
                        <Button variant="outline-primary"
                            className="btn-no-border btn-no-border--primary"
                            title="Edit" onClick={this.edit}>
                            <i className="fa fa-pencil pointerCursor icon-medium" style={{ fontSize: "18px" }}></i>
                        </Button>
                        <Button variant="outline-danger"
                            className="btn-no-border btn-no-border--danger"
                            title="Cancel" onClick={this.cancelBooking}>
                            <i className="fa fa-close pointerCursor icon-medium" style={{ fontSize: "18px" }}></i>
                        </Button>
                        <Button variant="outline-secondary"
                            className="btn-no-border btn-no-border--secondary"
                            title="Checked In" onClick={this.onCheckedIn}>
                            <i className="fa fa-check-square-o pointerCursor icon-medium" style={{ fontSize: "18px" }}></i>
                        </Button>
                    </div>
                );
                footer = (
                    <Modal.Footer className="modal-footer">
                        {closeButton}
                        {this.state.hotelBookingForm.step === 1 ? null : <Button variant="secondary" onClick={this.prevStep}>Previous</Button>}
                        {this.state.hotelBookingForm.step < 3 ? <Button variant="primary" onClick={this.nextStep}>Next</Button> : null}
                    </Modal.Footer>
                )
                break;

            case 'editBooking':
                headerButton = null;
                footer = (
                    <Modal.Footer className="modal-footer">
                        {closeButton}
                        {this.state.hotelBookingForm.step === 1 ? null : <Button variant="secondary" onClick={this.prevStep}>Previous</Button>}
                        {this.state.hotelBookingForm.step < 3 ? <Button variant="primary" type="submit">Next</Button> : null}
                        {this.state.hotelBookingForm.step === 3 ? <Button variant="primary" onClick={(e) => this.hotelBookedHandler(e)}>Submit</Button> : null}
                    </Modal.Footer>
                )
                break;

            default: footer = null;
        }

        return (
            <React.Fragment>
                <Modal show={this.props.showModal} onHide={this.closeModalHandler} centered>
                    <Modal.Header>
                        {modalTitle}
                        {headerButton}
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={this.state.validated} onSubmit={(e) => this.checkValidity(e)}>
                            {currentStepForm}
                            {footer}
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default HotelBookingForm;