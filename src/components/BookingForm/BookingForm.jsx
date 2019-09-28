import React from "react";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import FormUtils from "../../utils/formUtils";
import utils from "../../utils/utils";
import useStyles from "./BookingFormStyle";
import "./BookingForm.scss";

const BookingForm = props => {
  const classes = useStyles();

  let [expanded] = React.useState("panel1");
  const {
    onFormSubmit,
    onInputChange: inputfun,
    onDatePickerChange: datefun,
    onSelectChange: selectfun,
    onAddRoom,
    onDeleteRoom,
    avilableRooms,
    data,
    errors,
    options
  } = props;

  // const roomOptions = avilableRooms.map(room => {
  //   return { label: room.roomNumber, value: room.roomNumber };
  // });

  // data.rooms.map(roomId =>
  //   avilableRooms.filter(room => {
  //     if (room._id === roomId) selectedRooms.push(room);
  //     return room;
  //   })
  // );

  const handleChange = panel => (event, isExpanded) => {
    // setExpanded(isExpanded ? panel : false);
  };

  const getInputArgObj = (id, label, type) => {
    return {
      id,
      label,
      type,
      value: data[id],
      onChange: inputfun,
      error: errors[id]
    };
  };

  const getDateArgObj = (id, label, type, minDate) => {
    return {
      id,
      label,
      type,
      value: data[id],
      onChange: datefun,
      error: errors[id],
      minDate
    };
  };

  const getRoomOptions = roomType => {
    if (avilableRooms.length === 0) return [];

    const roomsByType = avilableRooms.filter(
      room => room.roomType === roomType
    );
    return roomsByType.map(room => {
      return { label: room.roomNumber, value: room.roomNumber, room };
    });
  };

  const checkRoomError = index => {
    if (errors.rooms && errors.rooms.length > 0) {
      const err = errors.rooms.find(error => error.index === index);
      return err ? err.message : null;
    }

    return null;
  };

  return (
    <form onSubmit={event => onFormSubmit(event)}>
      <div className="form-group">
        {FormUtils.renderInput(
          getInputArgObj("firstName", "First Name", "text")
        )}
        {FormUtils.renderInput(getInputArgObj("lastName", "Last Name", "text"))}
      </div>
      <div className="form-group">
        {FormUtils.renderInput(getInputArgObj("address", "Address", "text"))}
      </div>
      <div className="form-group">
        {FormUtils.renderDatepicker(
          getDateArgObj("checkIn", "Check In", "text", utils.getDate())
        )}
        {FormUtils.renderDatepicker(
          getDateArgObj("checkOut", "Check Out", "text", data.checkIn)
        )}
      </div>
      <div className="form-group">
        {FormUtils.renderInput(getInputArgObj("adults", "Adults", "number"))}
        {FormUtils.renderInput(
          getInputArgObj("children", "Children", "number")
        )}
        {FormUtils.renderInput(
          getInputArgObj("contactNumber", "Contact Number", "number")
        )}
      </div>
      <div className="form-group">
        {FormUtils.renderInput(
          getInputArgObj("roomCharges", "Room Charges", "number")
        )}
        {FormUtils.renderInput(getInputArgObj("advance", "Advance", "number"))}
      </div>
      <div className={classes.panel}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            className={classes.panelHeader}
          >
            <div className={classes.expansionPanelSummary}>
              <Typography className={classes.panelLabel}>Room</Typography>
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={onAddRoom}
              >
                <AddIcon />
              </Fab>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            {data.rooms.map((room, index) => {
              const error = checkRoomError(index);
              return (
                <div key={`room-${index}`} className="form-group">
                  {FormUtils.renderSelect({
                    id: "roomType",
                    label: "Room Type",
                    value: room.roomType,
                    onChange: event => selectfun(event, index),
                    options,
                    error
                  })}

                  {FormUtils.renderSelect({
                    id: "roomNumber",
                    label: "Room Number",
                    value: room.roomNumber,
                    onChange: event => selectfun(event, index),
                    options: getRoomOptions(room.roomType),
                    error: error ? " " : null
                  })}

                  <div>
                    <IconButton
                      color="secondary"
                      className={classes.deleteButton}
                      onClick={() => onDeleteRoom(index)}
                      disabled={index === 0}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              );
            })}
            {/* {FormUtils.renderSelect("roomNumber", "Room Number", null, "")} */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>

      <div className={classes.button}>
        {FormUtils.renderButton(
          null,
          "large",
          "Back",
          "secondary",
          classes.buttonSec,
          false
        )}
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

export default BookingForm;
