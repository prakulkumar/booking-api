import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import HotelIcon from "@material-ui/icons/Hotel";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import BookingForm from "../BookingForm/BookingForm";

import styles from "./FormCardStyle";

const FormCard = props => {
  const classes = styles();
  let [expanded, setExpanded] = React.useState("panel1");

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const inputChangedhandler = () => {};

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Booking
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.changed}
                color="inherit"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.changed}
                color="inherit"
              >
                <DeleteForeverIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.changed}
                color="inherit"
              >
                <HotelIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.changed}
                color="inherit"
              >
                <MeetingRoomIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <CardContent>
          <BookingForm />
        </CardContent>
        {/* <CardActions>
          <Button size="large" color="primary" className={classes.button}>
            Submit
          </Button>
        </CardActions> */}
      </Card>
    </React.Fragment>
  );
};

export default FormCard;
