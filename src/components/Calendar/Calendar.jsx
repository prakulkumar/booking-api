import React, { Component } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import utils from "./../../utils/utils";
import moment from "moment";
import roomService from "../../services/roomService";
import bookingService from "../../services/bookingService";
import "./Calendar.scss";
import Dialog from "./../../common/Dialog/Dialog";

class Calendar extends Component {
  state = {
    title: "",
    dateObj: {},
    rooms: [],
    bookings: [],
    rows: [],
    showModal: false,
    loading: false
  };

  constructor(props) {
    super(props);

    const { currentDate: date } = props.data;
    const dateObj = utils.getDateObj(date);
    const title = this.getTitle(date);

    this.state.title = title;
    this.state.dateObj = dateObj;
    this.state.loading = true;
  }

  async componentDidMount() {
    const rooms = await roomService.getRooms();
    const rows = this.getTableRows(rooms, this.state.dateObj);

    this.setState({ rooms, rows });

    this.showBookingProcess(this.state.dateObj);
  }

  componentDidUpdate() {
    this.props.data.isRefresh && this.showBookingProcess();
  }

  showBookingProcess = async dateObj => {
    const { data, onRefresh } = this.props;
    const bookings = await bookingService.getBookings(dateObj);

    this.setState({ bookings, loading: false });
    this.showBookings(dateObj, bookings);

    data.isRefresh && onRefresh();
  };

  showBookings = (dateObj, bookings) => {
    const { rooms } = this.state;

    bookings.forEach(booking => {
      let { checkIn, checkOut, months } = booking;
      const color = utils.generateRandomColor();
      if (months.length > 1) {
        const updatedValue = this.getUpdatedValues(booking, dateObj);
        checkIn = updatedValue.checkIn;
        checkOut = updatedValue.checkOut;
      }

      booking.rooms.forEach(bookedRoom => {
        const { roomNumber } = rooms.find(room => {
          return room._id === bookedRoom._id;
        });

        this.setBookingObjByRoom(roomNumber, checkIn, checkOut, booking, color);
      });
    });
  };

  setBookingObjByRoom = (roomNumber, checkIn, checkOut, booking, color) => {
    const rowIndex = this.state.rows.findIndex(
      row => row[0].room.roomNumber === roomNumber
    );
    const dates = utils.daysBetweenDates(checkIn, checkOut);
    this.updateRowObjByDate(dates, rowIndex, booking, color);
  };

  updateRowObjByDate = (dates, rowIndex, booking, color) => {
    const rowsArray = [...this.state.rows];

    dates.forEach(date => {
      const dateNumber = moment(date).date();
      rowsArray[rowIndex] = [...rowsArray[rowIndex]];
      rowsArray[rowIndex][dateNumber] = {
        ...rowsArray[rowIndex][dateNumber],
        booking,
        color
      };
    });

    this.setState({ rows: rowsArray });
  };

  getTableHeaders = () => {
    let tableHeaders = new Array(this.state.dateObj.days + 1).fill({});
    tableHeaders = tableHeaders.map((value, index) => {
      if (index !== 0) return { date: index < 10 ? `0${index}` : `${index}` };
      else return { date: "" };
    });

    return tableHeaders;
  };

  getTableRows = (rooms, dateObj) => {
    let rows = new Array(rooms.length).fill();
    rows.forEach((row, index) => {
      rows[index] = new Array(dateObj.days + 1).fill({
        room: { ...rooms[index] },
        handleShowModal: this.handleShowModal
      });
      rows[index][0] = { room: { ...rooms[index] }, show: true };
    });

    return rows;
  };

  getTitle = date =>
    `${moment(date)
      .format("MMMM")
      .toUpperCase()} ${moment(date).year()}`;

  getUpdatedValues = (booking, dateObj) => {
    let { checkIn, checkOut, months } = booking;
    const { month, year, days } = dateObj;
    const index = months.findIndex(month => month.month === dateObj.month);

    if (index === 0) {
      checkIn = utils.getDate(checkIn);
      checkOut = utils.getDate(`${month + 1}/${days}/${year}`);
    } else if (index === months.length - 1) {
      checkIn = utils.getDate(`${month + 1}/1/${year}`);
      checkOut = utils.getDate(checkOut);
    } else {
      checkIn = utils.getDate(`${month + 1}/1/${year}`);
      checkOut = utils.getDate(`${month + 1}/${days}/${year}`);
    }

    return { checkIn, checkOut };
  };

  handleChange = value => {
    const { dateObj: prevDateObj, rooms } = this.state;
    const prevDate = new Date(prevDateObj.year, prevDateObj.month);
    const newDate = moment(prevDate).add(value, "M");
    const dateObj = utils.getDateObj(newDate);
    const title = this.getTitle(newDate);
    const rows = this.getTableRows(rooms, dateObj);

    this.setState({ title, dateObj, rows, loading: true });
    this.showBookingProcess(dateObj);
  };

  handleShowModal = booking => {
    console.log({ booking }, this.state.showModal);
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { title, dateObj, rows, showModal, loading } = this.state;

    return (
      <div className="calendar__container">
        <CalendarHeader
          title={title}
          onChange={this.handleChange}
          month={dateObj.month}
        />
        <CalendarBody
          tableHeaders={this.getTableHeaders()}
          tableRows={rows}
          loading={loading}
          dateObj={dateObj}
        />
        {showModal && (
          <Dialog
            openModal={this.state.showModal}
            onCloseModal={this.handleCloseModal}
            size="lg"
          />
        )}
      </div>
    );
  }
}

export default Calendar;
