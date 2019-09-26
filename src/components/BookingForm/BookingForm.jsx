import React, { Component } from "react";
import { Typography } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FormUtils from "../../utils/formUtils";
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
    },
    errors: {}
  };

  // handleChange = panel => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  render() {
    return (
      <React.Fragment>
        <div className="form-group">
          {FormUtils.renderInput("firstName", "First Name", "text", "")}
          {FormUtils.renderInput("lastName", "Last Name", "text", "")}
        </div>
        <div className="form-group">
          {FormUtils.renderInput("address", "Address", "text", "")}
        </div>
        <div className="form-group">
          {FormUtils.renderDatepicker("checkIn", "Check In", null, new Date())}
          {FormUtils.renderDatepicker(
            "checkOut",
            "Check Out",
            null,
            new Date()
          )}
        </div>
        <div className="form-group">
          {FormUtils.renderInput("adults", "Adults", "number", "")}
          {FormUtils.renderInput("children", "Children", "number", "")}
          {FormUtils.renderInput(
            "contactNumber",
            "Contact Number",
            "number",
            ""
          )}
        </div>
        <div className="form-group">
          {FormUtils.renderInput("roomCharges", "Room Charges", "number", "")}
          {FormUtils.renderInput("advance", "Advance", "number", "")}
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
              {FormUtils.renderSelect("roomType", "Room Type", null, "")}
              {FormUtils.renderSelect("roomNumber", "Room Number", null, "")}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        {FormUtils.renderButton("large", "Submit", "primary", "form-button")}
      </React.Fragment>
    );
  }
}

export default BookingForm;
