import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import DatePicker from "../../common/DatePicker/DatePicker";

import "./BookingForm.scss";

// let [expanded, setExpanded] = React.useState("panel1");
class BookingForm extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      address: "",
      checkIn: "",
      checkOut: "",
      adults: "",
      children: 0,
      contactNumber: "",
      rooms: [],
      amount: "",
      advance: ""
    }
  };

  // handleChange = panel => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  inputChangedhandler = () => {};

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            value=""
            changed={this.inputChangedhandler}
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            value=""
            changed={this.inputChangedhandler}
          />
        </div>
        <div className="form-group">
          <Input
            id="address"
            label="Address"
            type="text"
            value=""
            changed={this.inputChangedhandler}
          />
        </div>
        {/* <div className="form-group">
          <DatePicker
            id="checkIn"
            label="Check In"
            value=""
            changed={this.inputChangedhandler}
          />
          <DatePicker
            id="checkOut"
            label="Check Out"
            value=""
            changed={this.inputChangedhandler}
          />
        </div> */}
        <div className="form-group">
          <Input
            id="adults"
            label="Adults"
            type="number"
            value=""
            changed={this.inputChangedhandler}
          />
          <Input
            id="chlidren"
            label="Children"
            type="number"
            value=""
            changed={this.inputChangedhandler}
          />
          <Input
            id="contactNumber"
            label="Contact Number"
            type="number"
            value=""
            changed={this.inputChangedhandler}
          />
        </div>
        <div className="form-group">
          <Input
            id="roomCharges"
            label="Room Charges"
            type="number"
            value=""
            changed={this.inputChangedhandler}
          />
          <Input
            id="advance"
            label="Advance"
            type="number"
            value=""
            changed={this.inputChangedhandler}
          />
        </div>
        <div className="panel">
          <ExpansionPanel
          // expanded={expanded === "panel1"}
          // onChange={this.handleChange("panel1")}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="accordianHeader"
            >
              <Typography>Room</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Select
                id="roomType"
                label="Room Type"
                value=""
                changed={this.inputChangedhandler}
              />
              <Select
                id="roomType"
                label="Room Type"
                value=""
                changed={this.inputChangedhandler}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <Button size="large" color="primary" className="form-button">
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default BookingForm;
