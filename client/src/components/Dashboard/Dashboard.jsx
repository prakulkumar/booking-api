import React, { Component } from "react";
import Calendar from "./../Calendar/Calendar";
import Navbar from "./../Navbar/Navbar";
import Button from "@material-ui/core/Button";

class Dashboard extends Component {
  state = {
    currentDate: new Date(),
    isRefresh: false
  };

  handleRefresh = () => {
    this.setState({ isRefresh: !this.state.isRefresh });
  };

  render() {
    const calendarData = this.state;

    return (
      <React.Fragment>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <Navbar onRefresh={this.handleRefresh} />
        <Calendar data={calendarData} onRefresh={this.handleRefresh} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
