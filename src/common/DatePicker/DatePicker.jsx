import React from "react";
import styles from "./DatePickerStyle";

const DatePicker = props => {
  const classes = styles();

  //const selectedDate = React.useState(new Date());
  return (
    // <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //   <KeyboardDatePicker
    //     disableToolbar
    //     variant="inline"
    //     format="MM/dd/yyyy"
    //     margin="normal"
    //     id={props.id}
    //     label={props.label}
    //     value={new Date()}
    //     onChange={props.changed}
    //     className={classes.root}
    //   />
    // </MuiPickersUtilsProvider>
    <div>Hello ! I'm a datepicker :)</div>
  );
};

export default DatePicker;
