import React from "react";
import { Typography } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Form from "../../common/Form/Form";

import "./BookingForm.scss";

// let [expanded, setExpanded] = React.useState("panel1");
class BookingForm extends Form {
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

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          {this.renderInput("firstName", "First Name", "text", "")}
          {this.renderInput("lastName", "Last Name", "text", "")}
        </div>
        <div className="form-group">
          {this.renderInput("address", "Address", "text", "")}
        </div>
        <div className="form-group">
          {this.renderDatepicker("checkIn", "Check In", null, new Date())}
          {this.renderDatepicker("checkOut", "Check Out", null, new Date())}
        </div>
        <div className="form-group">
          {this.renderInput("adults", "Adults", "number", "")}
          {this.renderInput("children", "Children", "number", "")}
          {this.renderInput("contactNumber", "Contact Number", "number", "")}
        </div>
        <div className="form-group">
          {this.renderInput("roomCharges", "Room Charges", "number", "")}
          {this.renderInput("advance", "Advance", "number", "")}
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
              {this.renderSelect("roomType", "Room Type", null, "")}
              {this.renderSelect("roomNumber", "Room Number", null, "")}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        {this.renderButton("large", "Submit", "primary", "form-button")}
      </React.Fragment>
    );
  }
}

export default BookingForm;
