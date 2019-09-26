import React from "react";
import TextField from "@material-ui/core/TextField";

import styles from "./InputStyle";

const Input = props => {
  const classes = styles(props);

  return <TextField {...props} className={classes.input} margin="normal" />;
};

export default Input;
