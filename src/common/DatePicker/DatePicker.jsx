import "moment";
import React from "react";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const CustomDatePicker = ({ label, date, handleDateChange }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="DD/MM/YYYY"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
