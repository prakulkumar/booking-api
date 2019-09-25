import React, { Component } from "react";
import Card from "../../common/Card/Card";
import BillingHeader from "./BillingFormHeader";
import BillingForm from "./BillingForm";

class BillingFormLayout extends Component {
  state = {};
  render() {
    return (
      <Card
        header={<BillingHeader />}
        content={<BillingForm />}
        maxWidth={700}
        margin="80px auto"
      />
    );
  }
}

export default BillingFormLayout;
