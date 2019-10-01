import React, { Component } from "react";
import utils from "../../utils/utils";

import Card from "../../common/Card/Card";
import BookingForm from "../BookingForm/BookingForm";
import BookingFormHeader from "./BookingFormHeader";

import FormUtils from "../../utils/formUtils";
import constants from "../../utils/constants";
import schemas from "../../utils/joiUtils";
import "./BookingFormLayout.scss";
import roomService from "../../services/roomService";
import bookingService from "../../services/bookingService";

const schema = schemas.bookingFormSchema;
const { success, error } = constants.snackbarVariants;
const roomTypes = [
  { label: "AC", value: "AC" },
  { label: "Non AC", value: "Non AC" },
  { label: "Deluxe", value: "Deluxe" },
  { label: "Suite", value: "Suite" }
];

class BookingFormLayout extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      address: "",
      checkIn: utils.getDate(),
      checkOut: utils.getDate(),
      adults: "",
      children: 0,
      contactNumber: "",
      rooms: [],
      roomCharges: "",
      advance: "",
      cancel: false
    },
    errors: {},
    allRooms: [],
    availableRooms: [],
    isEdit: false,
    disable: false,
    shouldDisable: false
  };

  async componentDidMount() {
    if (this.props.selectedRoom === null) this.props.history.push("/");

    const allRooms = await roomService.getRooms();
    this.setState({ allRooms, availableRooms: allRooms });

    const { pathname } = this.props.location;
    if (pathname === "/booking/viewBooking") this.setViewBookingData();
    else if (pathname === "/booking/newBooking") this.setNewBookingData();
  }

  setViewBookingData = () => {
    const { selectedBooking } = this.props;
    const booking = {
      ...selectedBooking,
      checkIn: selectedBooking.checkIn,
      checkOut: selectedBooking.checkOut
    };

    this.setState({
      data: booking,
      disable: true,
      shouldDisable: !this.state.isEdit
    });
  };

  setNewBookingData = () => {
    console.log("setNewBookingData");
    const { selectedRoom, selectedDate } = this.props;
    console.log(selectedDate);
    const data = { ...this.state.data };
    const { roomNumber, roomType, _id } = selectedRoom;
    const room = { roomNumber, roomType, _id };
    data.rooms.push(room);
    data.checkIn = selectedDate;
    data.checkOut = selectedDate;
    this.setState({ data });
  };

  handleInputChange = ({ currentTarget: input }) => {
    const { data, errors } = this.state;
    const updatedState = FormUtils.handleInputChange(
      input,
      data,
      errors,
      schema
    );
    this.setState({ data: updatedState.data, errors: updatedState.errors });
  };

  handleDatePickerChange = (event, id) => {
    const data = { ...this.state.data };
    data[id] = utils.getDate(event);
    if (id === "checkIn") data["checkOut"] = data[id];

    this.setState({ data });
  };

  handleSelectChange = (event, index) => {
    let errors = { ...this.state.errors };
    if (errors.rooms)
      errors.rooms = errors.rooms.filter(error => error.index !== index);

    const { name, value } = event.target;
    const data = { ...this.state.data };
    const rooms = [...data.rooms];
    let room = {};

    if (name === "roomType")
      room = this.state.availableRooms.find(room => room.roomType === value);
    else if (name === "roomNumber")
      room = this.state.allRooms.find(room => room.roomNumber === value);

    rooms[index] = {
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      _id: room._id
    };
    data.rooms = rooms;
    this.setState({ data, errors });
  };

  handleFormSubmit = async event => {
    const data = this.state.data;
    event.preventDefault();
    const errors = FormUtils.validate(data, schema);
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    const bookingData = {
      ...data,
      balance: data.roomCharges - data.advance,
      bookingDate: utils.getDate()
    };

    const { status } = await bookingService.addBooking(bookingData);
    if (status === 200) this.openSnackBar("Booking Successfull", success, "/");
    else this.openSnackBar("Error Occurred", error);
  };

  handleAddRoom = () => {
    const data = { ...this.state.data };
    const rooms = [...data.rooms];
    rooms.push({
      roomNumber: "",
      roomType: "",
      _id: ""
    });
    data.rooms = rooms;

    this.setState({ data });
  };

  handleDeleteRoom = index => {
    const data = { ...this.state.data };
    let rooms = [...data.rooms];

    rooms = rooms.filter((room, i) => i !== index);
    data.rooms = rooms;

    this.setState({ data });
  };

  openSnackBar = (message, variant, redirectTo) => {
    const snakbarObj = { open: true, message, variant };
    this.props.onSnackbarEvent(snakbarObj);
    redirectTo && this.props.history.push(redirectTo);
  };

  render() {
    const cardContent = (
      <BookingForm
        onDatePickerChange={this.handleDatePickerChange}
        onInputChange={this.handleInputChange}
        onSelectChange={this.handleSelectChange}
        onFormSubmit={this.handleFormSubmit}
        onAddRoom={this.handleAddRoom}
        onDeleteRoom={this.handleDeleteRoom}
        data={this.state.data}
        allRooms={this.state.allRooms}
        avilableRooms={this.state.availableRooms}
        errors={this.state.errors}
        options={roomTypes}
        shouldDisable={this.state.shouldDisable}
      />
    );

    return (
      <div className="cardContainer">
        <Card
          header={<BookingFormHeader />}
          content={cardContent}
          maxWidth={700}
          margin="40px auto"
        />
      </div>
    );
  }
}

export default BookingFormLayout;
