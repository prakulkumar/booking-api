import React, { Component } from "react";
import utils from "../../utils/utils";

import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HotelIcon from "@material-ui/icons/Hotel";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Card from "../../common/Card/Card";
import BookingForm from "../BookingForm/BookingForm";
import Snackbar from "../../common/Snackbar/Snackbar";

import FormUtils from "../../utils/formUtils";
import schemas from "../../utils/joiUtils";
import "./BookingFormLayout.scss";
import roomService from "../../services/roomService";
import bookingService from "../../services/bookingService";

const schema = schemas.bookingFormSchema;
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
      rooms: [
        {
          roomNumber: "101",
          roomType: "AC",
          _id: "5d3430ad632e154594ebf4a3"
        }
      ],
      roomCharges: "",
      advance: "",
      cancel: false
    },
    errors: {},
    allRooms: [],
    availableRooms: [],
    snackbar: {
      open: false,
      message: "",
      variant: "success"
    }
  };

  async componentDidMount() {
    const allRooms = await roomService.getRooms();
    this.setState({ allRooms, availableRooms: allRooms });
  }

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

    const response = await bookingService.addBooking(bookingData);
    const snackbar = { ...this.state.snackbar };
    snackbar.open = true;
    if (response.status === 200) {
      snackbar.message = "Booking Done";
      snackbar.variant = "success";
      this.setState({ snackbar });
      this.props.history.push("/");
    } else {
      snackbar.message = "Error Occured";
      snackbar.variant = "error";
      this.setState({ snackbar });
    }
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

  handleSnackBar = () => {
    const snackbar = { ...this.state.snackbar };
    snackbar.open = false;

    this.setState({ snackbar });
  };

  render() {
    const cardHeader = (
      <div className="form-header">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className="title">
              Booking
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.props.changed}
              color="inherit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.props.changed}
              color="inherit"
            >
              <DeleteForeverIcon />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.props.changed}
              color="inherit"
            >
              <HotelIcon />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.props.changed}
              color="inherit"
            >
              <MeetingRoomIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );

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
      />
    );

    return (
      <div className="cardContainer">
        <Snackbar
          open={this.state.snackbar.open}
          message={this.state.snackbar.message}
          onClose={this.handleSnackBar}
          variant={this.state.snackbar.variant}
        />
        <Card
          header={cardHeader}
          content={cardContent}
          maxWidth={700}
          margin="40px auto"
        />
      </div>
    );
  }
}

export default BookingFormLayout;
