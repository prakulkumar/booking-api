import React, { Component } from "react";
import Card from "../../common/Card/Card";
import BillingHeader from "./BillingFormHeader";
import BillingForm from "./BillingForm";
import schemas from "../../utils/joiUtils";
import FormUtils from "../../utils/formUtils";
import constants from "../../utils/constants";

import bookingService from "../../services/bookingService";
import utils from "../../utils/utils";
const { success, error } = constants.snackbarVariants;

const schema = schemas.billingFormSchema;

class BillingFormLayout extends Component {
  state = {
    selectedBooking: null,
    data: {
      cash: "",
      card: "",
      wallet: "",
      taxStatus: "withoutTax"
    },
    errors: {},
    payment: {
      cash: { checked: false, disable: true },
      card: { checked: false, disable: true },
      wallet: { checked: false, disable: true }
    }
  };

  componentDidMount() {
    const { selectedBooking, history } = this.props;
    if (selectedBooking === null) history.replace("/");
    else this.setState({ selectedBooking });
  }

  handleInputChange = ({ currentTarget: input }) => {
    const { data, errors } = this.state;
    const updatedState = FormUtils.handleInputChange(
      input,
      data,
      errors,
      schema
    );
    this.setState({ data: updatedState.data, errors: updatedState.errors });
  };

  handleRadioGroupChange = event => {
    const data = { ...this.state.data };
    data.taxStatus = event.currentTarget.value;
    this.setState({ data });
  };

  handleCheckboxChange = (event, name) => {
    const checked = event.currentTarget.checked;
    let data = { ...this.state.data };
    let payment = { ...this.state.payment };
    const errors = { ...this.state.errors };

    switch (name) {
      case "cash":
        payment.cash = { disable: !checked, checked };
        errors.cash && !checked && delete errors.cash;
        if (!checked) data.cash = "";
        break;

      case "card":
        payment.card = { disable: !checked, checked };
        errors.card && !checked && delete errors.card;
        if (!checked) data.card = "";
        break;

      case "wallet":
        payment.wallet = { disable: !checked, checked };
        errors.wallet && !checked && delete errors.wallet;
        if (!checked) data.wallet = "";
        break;

      default:
        payment = { ...payment };
        break;
    }
    checked && delete errors.customError;
    this.setState({ payment, errors, data });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const data = this.state.data;
    const errors = FormUtils.validate(data, schema);
    if (data.cash || data.card || data.wallet) delete errors.customError;
    else errors.customError = "Please select any payment mode";

    const payment = this.state.payment;
    if (errors.cash) {
      !payment.cash.checked && delete errors.cash;
    }
    if (errors.card) {
      !payment.card.checked && delete errors.card;
    }
    if (errors.wallet) {
      !payment.wallet.checked && delete errors.wallet;
    }
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    const { selectedBooking } = this.props;
    selectedBooking.checkedOutTime = utils.getTime();
    selectedBooking.status = { ...selectedBooking.status, checkedOut: true };
    const paymentData = { ...selectedBooking, payment: data };
    this.updateBookingPayment(paymentData);
  };

  updateBookingPayment = async bookingData => {
    const { status } = await bookingService.updateBooking(bookingData);
    if (status === 200) {
      this.openSnackBar("Checked out Successfully", success);
      this.props.onRedirectFromBilling(bookingData);
    } else this.openSnackBar("Error Occurred", error);
  };

  openSnackBar = (message, variant) => {
    const snakbarObj = { open: true, message, variant };
    this.props.onSnackbarEvent(snakbarObj);
  };

  render() {
    const { data, errors, selectedBooking, payment } = this.state;
    const cardContent = (
      <BillingForm
        onInputChange={this.handleInputChange}
        onCheckboxChange={this.handleCheckboxChange}
        onRadioGroupChange={this.handleRadioGroupChange}
        onFormSubmit={this.handleFormSubmit}
        data={data}
        errors={errors}
        booking={selectedBooking}
        payment={payment}
      />
    );

    return (
      <Card
        header={<BillingHeader />}
        content={cardContent}
        maxWidth={700}
        margin="80px auto"
      />
    );
  }
}

export default BillingFormLayout;
