import React, { Component } from "react";
import Joi from "joi-browser";

import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HotelIcon from "@material-ui/icons/Hotel";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Card from "../../common/Card/Card";
import BookingForm from "../BookingForm/BookingForm";

import FormUtils from "../../utils/formUtils";
import "./BookingFormLayout.scss";

class BookingFormLayout extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      address: "",
      checkIn: "",
      checkOut: "",
      adults: "",
      children: 0,
      contactNumber: "",
      rooms: [],
      roomCharges: "",
      advance: ""
    },
    errors: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("First Name")
      .min(3),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    address: Joi.string()
      .required()
      .label("Address"),
    checkIn: Joi.string()
      .required()
      .label("Check In"),
    checkOut: Joi.string()
      .required()
      .label("Check Out"),
    adults: Joi.number()
      .required()
      .label("Adults"),
    children: Joi.number()
      .required()
      .label("Children"),
    contactNumber: Joi.number()
      .required()
      .label("Contact Number"),
    roomCharges: Joi.number()
      .required()
      .label("Room Charges"),
    advance: Joi.number()
      .required()
      .label("Advance")
  };

  handleInputChange = ({ currentTarget: input }) => {
    const { data, errors } = this.state;
    const updatedState = FormUtils.handleInputChange(
      input,
      data,
      errors,
      this.schema
    );
    this.setState({ data: updatedState.data, errors: updatedState.errors });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const errors = FormUtils.validate(this.state.data, this.schema);
    this.setState({ errors });
    if (errors) return;
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
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleFormSubmit}
        data={this.state.data}
        errors={this.state.errors}
      />
    );

    return (
      <div className="cardContainer">
        <Card
          header={cardHeader}
          content={cardContent}
          maxWidth={700}
          margin="30px auto"
        />
      </div>
    );
  }
}

export default BookingFormLayout;
