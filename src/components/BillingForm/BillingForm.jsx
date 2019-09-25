import React from "react";
import { makeStyles } from "@material-ui/core";
import { FormControl, FormLabel, FormControlLabel } from "@material-ui/core";
import { Radio, RadioGroup } from "@material-ui/core";
import { Typography, Divider } from "@material-ui/core";
import Input from "../../common/Input/Input";
import Checkbox from "./../../common/Checkbox/Checkbox";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: { width: "50%" }
}));

const BillingForm = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("withTax");

  const handleChange = event => {
    setValue(event.target.value);
  };

  const renderInputItems = (label, value, inputId) => {
    return (
      <div className={classes.formGroup}>
        <Typography display={"block"} nowrap={"true"}>
          {label}
        </Typography>
        <Typography>:</Typography>
        <Input disabled width="50%" id={inputId} type="text" value={value} />
      </div>
    );
  };

  const renderPaymentMethods = (label, value, inputId, placeholder) => {
    return (
      <div className={classes.formGroup}>
        <Checkbox label={label} />
        <Input
          width="50%"
          id={inputId}
          type="text"
          value={value}
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <form>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Payment</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="tax"
          value={value}
          onChange={handleChange}
        >
          <div className={classes.formGroup}>
            <FormControlLabel
              value="withTax"
              control={<Radio />}
              label="With Tax"
            />
            <FormControlLabel
              value="withoutTax"
              control={<Radio />}
              label="Without Tax"
            />
          </div>
        </RadioGroup>
      </FormControl>
      {renderInputItems("Room Charges", 3000, "roomCharges")}
      {renderInputItems("Advance", 1000, "advance")}
      {renderInputItems("Misllaneous", 2000, "misllaneous")}
      {renderInputItems("Balance", 4000, "balance")}
      <Divider />
      {renderPaymentMethods("Cash Payment", "", "cash", "Ammount")}
      {renderPaymentMethods("Card Payment", "", "card", "Ammount")}
      {renderPaymentMethods("Wallet Payment", "", "wallet", "Ammount")}
    </form>
  );
};

export default BillingForm;
