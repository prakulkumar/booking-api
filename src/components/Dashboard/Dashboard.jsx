import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Calendar from "./../Calendar/Calendar";
import Navbar from "./../Navbar/Navbar";
import Snackbar from "../../common/Snackbar/Snackbar";
import BookingFormLayout from "../BookingForm/BookingFormLayout";
import BillingFormLayout from "../BillingForm/BillingFormLayout";
import roomService from "../../services/roomService";

import "./Dashboard.scss";
import utils from "../../utils/utils";
import constants from "../../utils/constants";

class Dashboard extends Component {
  state = {
    currentDate: utils.getDate(),
    isRefresh: false,
    selectedBooking: {},
    allRooms: [],
    selectedRoom: null,
    selectedDate: utils.getDate(),
    snackbarObj: {
      open: false,
      message: "",
      variant: constants.snackbarVariants.success
    }
  };

  async componentDidMount() {
    const allRooms = await roomService.getRooms();
    this.setState({ allRooms });
  }

  handleRefresh = () => {
    // this.setState({ isRefresh: !this.state.isRefresh });
    window.location.reload();
  };

  handleFormRedirect = (bookingObj, roomObj, selectedDate) => {
    const selectedBooking = bookingObj && { ...bookingObj };
    const selectedRoom = { ...roomObj };
    this.setState({ selectedBooking, selectedRoom, selectedDate });

    if (bookingObj) this.props.history.push("/booking/viewBooking");
    else this.props.history.push("/booking/newBooking");
  };

  handleSnackbarEvent = snackbarObj => {
    this.setState({ snackbarObj });
  };

  handleSnackBar = () => {
    const snackbarObj = { ...this.state.snackbarObj };
    snackbarObj.open = false;

    this.setState({ snackbarObj });
  };

  render() {
    const {
      currentDate,
      isRefresh,
      snackbarObj,
      selectedBooking,
      selectedRoom,
      selectedDate,
      allRooms
    } = this.state;

    return (
      <div className="mainContainer">
        <Snackbar
          open={snackbarObj.open}
          message={snackbarObj.message}
          onClose={this.handleSnackBar}
          variant={snackbarObj.variant}
        />
        <Navbar onRefresh={this.handleRefresh} />
        <div className="subContainer">
          <Switch>
            <Route
              path={["/booking/newBooking", "/booking/viewBooking"]}
              render={props => (
                <BookingFormLayout
                  onSnackbarEvent={this.handleSnackbarEvent}
                  selectedBooking={selectedBooking}
                  selectedRoom={selectedRoom}
                  selectedDate={selectedDate}
                  {...props}
                />
              )}
            />
            <Route path="/billing" component={BillingFormLayout} />
            <Route
              path="/"
              exact
              render={props => (
                <Calendar
                  currentDate={currentDate}
                  isRefresh={isRefresh}
                  onRefresh={this.handleRefresh}
                  onFormRedirect={this.handleFormRedirect}
                  allRooms={allRooms}
                  {...props}
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
