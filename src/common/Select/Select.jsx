import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

import styles from "./SelectStyle";

const Select = props => {
  const classes = styles();

  const handle = () => {
    console.log("handle");
  };

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
      id={props.id}
      select
      label={props.label}
      className={classes.input}
      value={props.value}
      onChange={handle}
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
