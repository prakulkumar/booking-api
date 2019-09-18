import React from "react";
import { Navbar } from "react-bootstrap";
import moment from "moment";
import "./CalendarHeader.scss";

const CalendarHeader = ({ title, onChange, month }) => {
  return (
    <Navbar bg="light" className="calendarHeader__container">
      <i
        className={
          moment().month() === month
            ? "fa fa-chevron-left disableNavIcon"
            : "fa fa-chevron-left pointerCursor"
        }
        onClick={() => onChange(-1)}
      ></i>
      <h5 className="calendarHeader__title">{title}</h5>
      <i
        className="fa fa-chevron-right pointerCursor"
        onClick={() => onChange(1)}
      ></i>
    </Navbar>
  );
};

export default CalendarHeader;
