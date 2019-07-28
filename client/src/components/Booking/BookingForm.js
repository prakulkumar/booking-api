import React from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './BookingForm.css';

const bookingForm = (props) => {

    const bookingDetailsForm = (
        <React.Fragment>
            <Form.Row>
                <Form.Group as={Col} md="5" controlId="formPlaintext" className="display-flex">
                    <Form.Control
                        title="First Name"
                        type="text"
                        placeholder="First Name"
                        value={props.hotelBookingForm.firstName}
                        name="firstName"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        className="valueCapitalize"
                        required />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formPlaintext" className="display-flex">
                    <Form.Control
                        title="Last Name"
                        type="text"
                        placeholder="Last Name"
                        value={props.hotelBookingForm.lastName}
                        name="lastName"
                        className="valueCapitalize"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        required />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="10" controlId="formPlaintextarea" className="display-flex">
                    <Form.Control
                        title="Address"
                        as="textarea"
                        rows="1"
                        placeholder="Address"
                        value={props.hotelBookingForm.address}
                        name="address"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        required />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="5" controlId="formPlainCalendar" className="display-flex">
                    <DatePicker
                        title="Check In"
                        selected={props.hotelBookingForm.checkIn}
                        onSelect={(event) => props.onChanged({ event, name: "checkIn", isDate: true })}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Check In"
                        minDate={new Date()}
                        key="checkIn"
                        className="form-control"
                        disabled={!props.isEdit && props.disable || props.checkedIn}
                        required
                    />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formPlaintCalendar" className="display-flex">
                    <DatePicker
                        title="Check Out"
                        selected={props.hotelBookingForm.checkOut}
                        onSelect={(event) => props.onChanged({ event, name: "checkOut", isDate: true })}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Check Out"
                        minDate={props.hotelBookingForm.checkIn}
                        key="checkOut"
                        className="form-control"
                        disabled={!props.isEdit && props.disable}
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
                        value={props.hotelBookingForm.adults}
                        name="adults"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        min="1"
                        required />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Children"
                        type="number"
                        placeholder="Children"
                        value={props.hotelBookingForm.children}
                        name="children"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        min="0"
                        required />
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Contact Number"
                        type="number"
                        placeholder="Contact Number"
                        value={props.hotelBookingForm.contactNumber}
                        name="contactNumber"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        required />
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} md="5" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Room Charges"
                        type="number"
                        placeholder="Room Charges"
                        value={props.hotelBookingForm.amount}
                        name="amount"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        min="1"
                        required></Form.Control>
                    <span className="required">*</span>
                </Form.Group>
                <Form.Group as={Col} md="5" controlId="formPlainNumber" className="display-flex">
                    <Form.Control
                        title="Advance"
                        type="number"
                        placeholder="Advance"
                        value={props.hotelBookingForm.advance}
                        name="advance"
                        onChange={props.onChanged}
                        disabled={!props.isEdit && props.disable}
                        min="0"
                        required></Form.Control>
                    <span className="required">*</span>
                </Form.Group>
            </Form.Row>
        </React.Fragment>
    )

    const roomDetailsForm = (
        <div className="add-room-form">
            {
                props.hotelBookingForm.rooms.map((room, index) => {
                    return (
                        <Form.Row key={index}>
                            <Form.Group as={Col} md="4" controlId="formPlainSelect" className="display-flex">
                                <Form.Control
                                    as="select" title="Room Type"
                                    value={props.hotelBookingForm.rooms[index].roomType}
                                    name="roomType"
                                    onChange={(event) => props.onRoomChanged(event, "roomType", index)}
                                    disabled={!props.isEdit && props.disable}
                                    required >
                                    <option value='' hidden>Room Type</option>
                                    {props.roomTypes.map((roomType, i) => {
                                        return <option key={`roomType${i}`}>{roomType}</option>
                                    })}
                                </Form.Control>
                                <span className="required">*</span>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="formPlainSelect" className="display-flex">
                                <Form.Control
                                    as="select" title="Room No"
                                    value={props.hotelBookingForm.rooms[index].roomNumber}
                                    name="roomNumber"
                                    onChange={(event) => props.onRoomChanged(event, "roomNumber", index)}
                                    disabled={!props.isEdit && props.disable}
                                    required >
                                    <option value='' hidden>Room No  {room.roomNumber}</option>
                                    {props.availableRooms.map((r, i) => {
                                        if (r.roomType === room.roomType) {
                                            return <option key={`roomNo${i}`}>{r.roomNumber}</option>
                                        }
                                        return null;
                                    })}
                                </Form.Control>
                                <span className="required">*</span>
                            </Form.Group>
                            {index === 0 ? (
                                <Form.Group as={Col} md="2" className="icon">
                                    <Button variant="outline-primary"
                                        className="btn-no-border btn-no-border--primary addIcon"
                                        type="button"
                                        onClick={props.addRoom}
                                        disabled={!props.isEdit && props.disable} title="Add Room">
                                        <i className="fa fa-plus pointerCursor icon-medium"></i>
                                    </Button>
                                </Form.Group>
                            ) : (
                                    <Form.Group as={Col} md="2" className="icon">
                                        <Button variant="outline-danger"
                                            className="btn-no-border btn-no-border--danger deleteIcon"
                                            type="button"
                                            disabled={!props.isEdit && props.disable}
                                            title="Delete"
                                            onClick={() => props.deleteRoom(index)}
                                        >
                                            <i className="fa fa-trash-o pointerCursor icon-medium"></i>
                                        </Button>
                                    </Form.Group>
                                )}
                        </Form.Row>
                    )
                })
            }
        </div>
    );

    let form = (
        <Form noValidate validated={props.validated}
            onSubmit={props.onBooked}>
            <div className="display-flex">
                <div className="booking-details-form">{bookingDetailsForm}</div>
                <div className="separator"></div>
                {props.hotelBookingForm.rooms.length === 0 ? (
                    <div className="room-details-form">
                        <h4>Choose Room to Book</h4>
                    </div>
                ) :
                    roomDetailsForm}
            </div>
            <Modal.Footer className="modal-footer">
                <Button variant="secondary">Close</Button>
                <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
        </Form>
    );
    return <React.Fragment>{form}</React.Fragment>
};

export default bookingForm;