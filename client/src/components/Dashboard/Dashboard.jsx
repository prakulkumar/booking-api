import React, { Component } from "react";
import Calendar from "./../Calendar/Calendar";
import Navbar from "./../Navbar/Navbar";
import bookingService from "../../services/bookingService";
import utils from "./../../utils/utils";

class Dashboard extends Component {
  state = {
    currentDate: new Date(),
    bookings: []
  };

  componentDidMount() {
    this.getBookings();
  }

  getBookings = async () => {
    const bookings = await bookingService.getBookings(
      utils.getDateObj(this.state.currentDate)
    );

    this.setState({ bookings });
  };

  handleRefresh = () => {
    this.getBookings();
  };

  render() {
    const calendarData = this.state;

    return (
      <React.Fragment>
        <Navbar onRefresh={this.handleRefresh} />
        <Calendar data={calendarData} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
