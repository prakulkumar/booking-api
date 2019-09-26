import React, { Component } from "react";
import Joi from "joi-browser";

import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HotelIcon from "@material-ui/icons/Hotel";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Card from "../../common/Card/Card";
import BookingForm from "../BookingForm/BookingForm";
import Form from "../../common/Form/Form";

class BookingFormLayout extends Form {
  state = {
    bookingForm: {}
  };

  schema = {
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name")
  };

  render() {
    const cardHeader = (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Booking</Typography>
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

    const cardContent = <BookingForm />;

    return (
      <Card
        header={cardHeader}
        content={cardContent}
        maxWidth={700}
        margin="80px auto"
      />
    );
  }
}

export default BookingFormLayout;
