import React, { Component } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { getDateObj } from "./../../utils/utils";
import moment from "moment";
import roomService from "../../services/roomService";
import bookingService from "../../services/bookingService";
import "./Calendar.scss";

class Calendar extends Component {
  state = { title: "", dateObj: {}, rooms: [] };

  constructor(props) {
    super(props);

    const { currentDate: date } = props.data;
    const dateObj = getDateObj(date);
    const title = this.getTitle(date);

    this.state.title = title;
    this.state.dateObj = dateObj;
  }

  async componentDidMount() {
    const rooms = await roomService.getRooms();
    const bookings = await bookingService.getBookings(this.state.dateObj);

    console.log(233, bookings);
    this.setState({ rooms });
  }

  getTableHeaders = () => {
    let tableHeaders = new Array(this.state.dateObj.days + 1).fill({});
    tableHeaders = tableHeaders.map((value, index) => {
      if (index !== 0) return { date: index < 10 ? `0${index}` : `${index}` };
      else return { date: "" };
    });

    return tableHeaders;
  };

  getTableRows = () => {
    const { rooms, dateObj } = this.state;

    let rows = new Array(rooms.length).fill();
    rows.forEach((row, index) => {
      rows[index] = new Array(dateObj.days + 1).fill({ ...rooms[index] });
      rows[index][0] = { ...rooms[index], show: true };
    });

    return rows;
  };

  getTitle = date =>
    `${moment(date)
      .format("MMMM")
      .toUpperCase()} ${moment(date).year()}`;

  handleChange = value => {
    const { dateObj: prevDateObj } = this.state;
    const prevDate = new Date(prevDateObj.year, prevDateObj.month);
    const newDate = moment(prevDate).add(value, "M");
    const dateObj = getDateObj(newDate);
    const title = this.getTitle(newDate);

    this.setState({ title, dateObj });
  };

  render() {
    const { title, dateObj } = this.state;

    return (
      <div className="calendar__container">
        <CalendarHeader
          title={title}
          onChange={this.handleChange}
          month={dateObj.month}
        />
        <CalendarBody
          tableHeaders={this.getTableHeaders()}
          tableRows={this.getTableRows()}
        />
      </div>
    );
  }
}

export default Calendar;
