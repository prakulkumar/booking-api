import React from "react";
import { Typography } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FormUtils from "../../utils/formUtils";
import useStyles from "./BookingFormStyle";
import "./BookingForm.scss";

const BookingForm = props => {
  const classes = useStyles();

  let [expanded, setExpanded] = React.useState("panel1");
  const { onFormSubmit, onInputChange, data, errors } = props;
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <form onSubmit={event => onFormSubmit(event)}>
      <div className="form-group">
        {FormUtils.renderInput(
          "firstName",
          "First Name",
          "text",
          data.firstName,
          onInputChange,
          errors.firstName
        )}
        {FormUtils.renderInput(
          "lastName",
          "Last Name",
          "text",
          data.lastName,
          onInputChange,
          errors.lastName
        )}
      </div>
      <div className="form-group">
        {FormUtils.renderInput(
          "address",
          "Address",
          "text",
          data.address,
          onInputChange,
          errors.address
        )}
      </div>
      <div className="form-group">
        {FormUtils.renderDatepicker(
          "checkIn",
          "Check In",
          data.checkIn,
          onInputChange,
          errors.checkIn
        )}
        {FormUtils.renderDatepicker(
          "checkOut",
          "Check Out",
          data.checkOut,
          onInputChange,
          errors.checkOut
        )}
      </div>
      <div className="form-group">
        {FormUtils.renderInput(
          "adults",
          "Adults",
          "number",
          data.adults,
          onInputChange,
          errors.adults
        )}
        {FormUtils.renderInput(
          "children",
          "Children",
          "number",
          data.children,
          onInputChange,
          errors.children
        )}
        {FormUtils.renderInput(
          "contactNumber",
          "Contact Number",
          "number",
          data.contactNumber,
          onInputChange,
          errors.contactNumber
        )}
      </div>
      <div className="form-group">
        {FormUtils.renderInput(
          "roomCharges",
          "Room Charges",
          "number",
          data.roomCharges,
          onInputChange,
          errors.roomCharges
        )}
        {FormUtils.renderInput(
          "advance",
          "Advance",
          "number",
          data.advance,
          onInputChange,
          errors.advance
        )}
      </div>
      <div className={classes.panel}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.panelHeader}
          >
            <Typography>Room</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {FormUtils.renderSelect("roomType", "Room Type", null, "")}
            {FormUtils.renderSelect("roomNumber", "Room Number", null, "")}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>

      <div className={classes.button}>
        {FormUtils.renderButton(
          null,
          "large",
          "Cancel",
          "secondary",
          classes.buttonSec
        )}
        {FormUtils.renderButton("submit", "large", "Submit", "primary")}
      </div>
    </form>
  );
};

export default BookingForm;
