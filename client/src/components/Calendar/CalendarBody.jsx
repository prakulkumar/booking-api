import React from "react";
import { getShortName } from "./../../utils/utils";
import moment from "moment";
import "./CalendarBody.scss";

const CalendarBody = ({ tableHeaders, tableRows }) => {
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>{renderTableHead(tableHeaders)}</tr>
        </thead>
      </table>
      <table className="calendarBody">
        <tbody>{renderTableRows(tableRows)}</tbody>
      </table>
    </React.Fragment>
  );
};

const renderTableHead = tableHeaders => {
  return (
    <React.Fragment>
      {tableHeaders.map(value => (
        <th
          className="calendarBody__header textCenter importantCell"
          key={`date_${value.date}`}
        >
          {value.date}
        </th>
      ))}
    </React.Fragment>
  );
};

const renderTableRows = tableRows => {
  return (
    <React.Fragment>
      {tableRows.map((row, index) => (
        <tr key={`row_${index}`}>{renderTableColumns(row)}</tr>
      ))}
    </React.Fragment>
  );
};

const renderTableColumns = row => {
  return (
    <React.Fragment>
      {row.map((column, index) => getStandardCell(getArgObj(column, index)))}
    </React.Fragment>
  );
};

const getStandardCell = (...argument) => {
  const arg = argument[0];
  const customStyle = {
    color: arg.color,
    backgroundColor: arg.color && "rgb(240, 255, 255)"
  };

  return (
    <td
      key={arg.key}
      style={customStyle}
      className={`textCenter calendarBody__cell ${arg.customClass}`}
      onClick={() => arg.handleShowModal(arg.booking)}
    >
      {arg.value}
    </td>
  );
};

const getArgObj = (column, index) => {
  let { show, room, booking, handleShowModal, color } = column;
  const currentDate = moment().date();
  const customClass = getCustomClass(show, index, currentDate, booking);
  handleShowModal =
    index >= currentDate || booking ? handleShowModal : () => {};
  const name = booking && getShortName(booking.firstName, booking.lastName);
  const key = `column_${index}`;

  if (show) return { key, value: room.roomNumber, customClass };
  else
    return {
      key,
      value: name,
      customClass,
      handleShowModal,
      color,
      booking
    };
};

const getCustomClass = (show, index, currentDate, booking) => {
  let customClass;
  if (!show) {
    if (index < currentDate) customClass = "disableCell";
    if (booking) customClass = `${customClass} pointerCursor`;
    if (index >= currentDate) customClass = "pointerCursor";
  } else customClass = "importantCell";

  return customClass;
};

export default CalendarBody;
