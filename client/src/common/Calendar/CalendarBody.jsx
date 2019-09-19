import React from "react";
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

const getStandardCell = (key, value, customClass) => {
  return (
    <td key={key} className={`textCenter calendarBody__cell ${customClass}`}>
      {value}
    </td>
  );
};

const renderTableColumns = row => {
  return (
    <React.Fragment>
      {row.map((column, index) =>
        column.show
          ? getStandardCell(
              `column_${index}`,
              column.room.roomNumber,
              "importantCell"
            )
          : getStandardCell(`column_${index}`, null)
      )}
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
