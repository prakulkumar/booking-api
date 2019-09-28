import React, { Component } from "react";
import Card from "../../common/Card/Card";
import BillingHeader from "./BillingFormHeader";
import BillingForm from "./BillingForm";
import schema from "../../utils/joiUtils";
import FormUtils from "../../utils/formUtils";

class BillingFormLayout extends Component {
  state = {
    data: {
      cash: "",
      card: "",
      wallet: ""
    },
    errors: {}
  };

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

  handleFormSubmit = event => {
    event.preventDefault();
    const errors = FormUtils.validate(this.state.data, schema);
    this.setState({ errors });
    if (errors) return;
  };

  render() {
    const cardContent = (
      <BillingForm
        onInputChange={this.handleInputChange}
        onFormSubmit={this.handleFormSubmit}
        data={this.state.data}
        errors={this.state.errors}
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
