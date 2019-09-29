import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import HotelIcon from "@material-ui/icons/Hotel";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const BookingFormHeader = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className="title">
            Booking
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <DeleteForeverIcon />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <HotelIcon />
          </IconButton>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <MeetingRoomIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default BookingFormHeader;
