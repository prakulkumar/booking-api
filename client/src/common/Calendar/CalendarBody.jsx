import React from "react";
import { getShortName } from "./../../utils/utils";

import "./CalendarBody.scss";

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

const getStandardCell = (
  key,
  value,
  customClass,
  handleShowModal,
  color,
  booking
) => {
  return (
    <td
      key={key}
      style={{ color, backgroundColor: color && "rgb(240, 255, 255)" }}
      className={`textCenter calendarBody__cell pointerCursor ${customClass}`}
      onClick={() => handleShowModal(booking)}
    >
      {value}
    </td>
  );
};

const renderTableColumns = row => {
  return (
    <React.Fragment>
      {row.map((column, index) => {
        let { show, room, booking, handleShowModal, color } = column;
        const name =
          booking && getShortName(booking.firstName, booking.lastName);

        return show
          ? getStandardCell(`column_${index}`, room.roomNumber, "importantCell")
          : getStandardCell(
              `column_${index}`,
              name,
              "",
              handleShowModal,
              color,
              booking
            );
      })}
    </React.Fragment>
  );
};

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

export default CalendarBody;
