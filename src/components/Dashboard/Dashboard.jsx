import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Calendar from "./../Calendar/Calendar";
import Navbar from "./../Navbar/Navbar";
import Snackbar from "../../common/Snackbar/Snackbar";
import BookingFormLayout from "../BookingForm/BookingFormLayout";
import BillingFormLayout from "../BillingForm/BillingFormLayout";

import "./Dashboard.scss";
import utils from "../../utils/utils";
import constants from "../../utils/constants";

class Dashboard extends Component {
  state = {
    currentDate: utils.getDate(),
    isRefresh: false,
    snackbarObj: {
      open: false,
      message: "",
      variant: constants.snackbarVariants.success
    }
  };

  handleRefresh = () => {
    // this.setState({ isRefresh: !this.state.isRefresh });
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
    const { currentDate, isRefresh, snackbarObj } = this.state;
    const calendarData = { currentDate, isRefresh };

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
              path="/booking"
              render={props => (
                <BookingFormLayout
                  onSnackbarEvent={this.handleSnackbarEvent}
                  {...props}
                />
              )}
            />
            <Route path="/billing" component={BillingFormLayout} />
            <Route
              path="/"
              render={props => (
                <Calendar
                  data={calendarData}
                  onRefresh={this.handleRefresh}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
