import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Divider } from "@material-ui/core";
import Input from "../../common/Input/Input";
import Checkbox from "./../../common/Checkbox/Checkbox";
import FormUtils from "../../utils/formUtils";
// import Dialog from "../../common/Dialog/Dialog";
// import RadioGroup from "./../../common/RadioGroup/RadioGroup";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: { width: "50%" },
  paymentMethods: {
    display: "flex"
  },
  checkbox: {
    marginTop: 10
  }
}));

const BillingForm = props => {
  const classes = useStyles();
  const { onFormSubmit, onInputChange, data, errors } = props;
  // ------------------------RadioGroup-----------
  // const [value, setValue] = React.useState();

  // const handleChange = event => {
  //   setValue(event.target.value);
  // };

  // const radioButtons = [
  //   { value: "withTax", label: "With Tax" },
  //   { value: "withOutTax", label: "WithOut Tax" }
  // ];

  // ------------------------DatePicker-----------
  // const [selectedDate, setSelectedDate] = React.useState(new Date());

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  // ------------------------Dialog-----------
  // const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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

  const renderPaymentMethods = (
    label,
    inputId,
    value,
    onInputChange,
    error
  ) => {
    return (
      <div className={classes.formGroup}>
        <Checkbox className={classes.checkbox} />
        {FormUtils.renderInput(
          inputId,
          label,
          "number",
          value,
          onInputChange,
          error
        )}
      </div>
    );
  };

  return (
    <form onSubmit={event => onFormSubmit(event)}>
      {/* <DatePicker date={selectedDate} handleDateChange={handleDateChange} /> */}
      {/* <RadioGroup
        ariaLabel={"taxInfo"}
        name={"tax"}
        value={value}
        handleChange={handleChange}
        radioButtons={radioButtons}
      /> */}
      {/* <Dialog open={open} onClose={handleClose} /> */}
      {renderInputItems("Room Charges", 3000, "roomCharges")}
      {renderInputItems("Advance", 1000, "advance")}
      {renderInputItems("Misllaneous", 2000, "misllaneous")}
      {renderInputItems("Balance", 4000, "balance")}
      <Divider />
      <div className={classes.paymentMethods}>
        {renderPaymentMethods(
          "Cash Payment",
          "cash",
          data.cash,
          onInputChange,
          errors.cash
        )}
        {renderPaymentMethods(
          "Card Payment",
          "card",
          data.card,
          onInputChange,
          errors.card
        )}
        {renderPaymentMethods(
          "Wallet Payment",
          "wallet",
          data.wallet,
          onInputChange,
          errors.wallet
        )}
      </div>

      <div>
        {FormUtils.renderButton(
          "submit",
          "large",
          "Submit",
          "primary",
          null,
          Object.keys(errors).length ? true : false
        )}
      </div>
    </form>
  );
};

export default BillingForm;
