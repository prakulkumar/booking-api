import React, { Component } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import { getDateObj, generateRandomColor, getDate } from "./../../utils/utils";
import moment from "moment";
import roomService from "../../services/roomService";
import bookingService from "../../services/bookingService";
import "./Calendar.scss";

class Calendar extends Component {
  state = { title: "", dateObj: {}, rooms: [], bookings: [] };

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

    this.setState({ rooms, bookings });
    this.setBookings();
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

  setBookings = () => {
    console.log(99, this.state.bookings);
    const { bookings, dateObj } = this.state;

    bookings.forEach(booking => {
      let { checkIn, checkOut, months, rooms } = booking;
      const color = generateRandomColor();
      const index = months.findIndex(
        month => month.monthNumber === dateObj.month
      );

      const updatedValue = this.updateValues(
        checkIn,
        checkOut,
        dateObj,
        months.length,
        index
      );

      checkIn = updatedValue.checkIn;
      ckeckOut = updatedValue.checkOut;

      rooms.forEach(roomId => {});
    });
  };

  updateValues = (checkIn, checkOut, dateObj, monthsCount, index) => {
    const { month, year, days } = dateObj;

    if (index === 0) {
      checkIn = getDate(checkIn);
      checkOut = getDate(`${month + 1}/${days}/${year}`);
    } else if (index === monthsCount - 1) {
      checkIn = getDate(`${month + 1}/1/${year}`);
      checkOut = getDate(checkOut);
    } else {
      checkIn = getDate(`${month + 1}/1/${year}`);
      checkOut = getDate(`${month + 1}/${days}/${year}`);
    }

    return { checkIn, checkOut };
  };

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
