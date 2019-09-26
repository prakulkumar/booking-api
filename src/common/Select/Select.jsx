import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

import styles from "./SelectStyle";

const Select = props => {
  const classes = styles();

  const currencies = [
    {
      label: "$",
      value: "$"
    },
    {
      label: "R",
      value: "R"
    },
    {
      label: "S",
      value: "S"
    }
  ];
  return (
    <TextField
      {...props}
      select
      className={classes.input}
      SelectProps={{
        MenuProps: {
          className: classes.menu
        }
      }}
      margin="normal"
    >
      {currencies.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
