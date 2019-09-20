import React, { Component } from "react";
import HeaderNavbar from "../Navbar/Navbar";
import Calendar from "./../Calendar/Calendar";

class Dashboard extends Component {
  state = {
    currentDate: new Date()
  };

  render() {
    const { currentDate } = this.state;
    const calendarData = { currentDate };

    return (
      <React.Fragment>
        <HeaderNavbar />
        <Calendar data={calendarData} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
