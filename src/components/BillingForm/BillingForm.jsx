import React from "react";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Checkbox from "./../../common/Checkbox/Checkbox";
import FormUtils from "../../utils/formUtils";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  input: { width: "40%" },
  paymentMethods: {
    display: "flex"
  },
  checkbox: {
    marginTop: 20
  },
  inputItems: {
    width: "30%"
  },
  button: {
    textAlign: "right"
  },
  radioGroup: {
    marginBottom: 20
  }
}));

const BillingForm = props => {
  const classes = useStyles();
  const { onFormSubmit, onInputChange, data, errors } = props;

  const renderInputItems = (label, value, inputId) => {
    return (
      <div className={classes.formGroup}>
        <Typography
          display={"block"}
          nowrap={"true"}
          className={classes.inputItems}
        >
          {label}
        </Typography>
        <Typography>:</Typography>
        <div style={{ width: "50%" }}>
          {FormUtils.renderInput(
            inputId,
            null,
            "number",
            value,
            null,
            null,
            null,
            true
          )}
        </div>
      </div>
    );
  };

  const renderPaymentMethods = (
    label,
    inputId,
    value,
    onInputChange,
    error,
    disabled
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
          !disabled && error,
          null,
          disabled
        )}
      </div>
    );
  };

  const radioButtons = [
    { value: "withOutTax", label: "WithOut Tax" },
    { value: "withTax", label: "With Tax" }
  ];

  return (
    <form onSubmit={event => onFormSubmit(event)}>
      <div className={classes.radioGroup}>
        {FormUtils.renderRadioGroup({
          label: "",
          ariaLabel: "taxInfo",
          name: "tax",
          value: data.tax,
          onChange: onInputChange,
          radioButtons
        })}
      </div>
      <div>
        {renderInputItems("Room Charges", 3000, "roomCharges")}
        {renderInputItems("Advance", 1000, "advance")}
        {renderInputItems("Misllaneous", 2000, "misllaneous")}
        {renderInputItems("Balance", 4000, "balance")}
      </div>
      {/* <Divider className={classes.divider} /> */}
      <div className={classes.paymentMethods}>
        {renderPaymentMethods(
          "Cash Payment",
          "cash",
          data.cash,
          onInputChange,
          errors.cash,
          false
        )}
        {renderPaymentMethods(
          "Card Payment",
          "card",
          data.card,
          onInputChange,
          errors.card,
          true
        )}
        {renderPaymentMethods(
          "Wallet Payment",
          "wallet",
          data.wallet,
          onInputChange,
          errors.wallet,
          true
        )}
      </div>

      <div className={classes.button}>
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
