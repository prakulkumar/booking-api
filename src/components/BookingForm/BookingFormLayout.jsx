import React, { Component } from "react";

import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HotelIcon from "@material-ui/icons/Hotel";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Card from "../../common/Card/Card";
import BookingForm from "../BookingForm/BookingForm";

import FormUtils from "../../utils/formUtils";
import schema from "../../utils/joiUtils";
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

  handleFormSubmit = event => {
    event.preventDefault();
    const errors = FormUtils.validate(this.state.data, schema);
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
          margin="40px auto"
        />
      </div>
    );
  }
}

export default BookingFormLayout;
