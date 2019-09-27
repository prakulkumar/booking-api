import "moment";
import React from "react";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import styles from "./DatePickerStyle";

const CustomDatePicker = ({ label, value, onChange, error, ...props }) => {
  const classes = styles(props);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker
        error={error && true}
        className={classes.root}
        disableToolbar
        variant="inline"
        format="DD/MM/YYYY"
        margin="normal"
        id={label}
        label={label}
        value={value}
        onChange={event => onChange(event)}
        helperText={error}
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
