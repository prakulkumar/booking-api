import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import "./Navbar.scss";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    width: "100%",
    zIndex: "1000"
  },
  title: {
    flexGrow: 1
  }
}));

const HeaderNavbar = ({ onRefresh }) => {
  const classes = useStyles();

  // const [open, setOpen] = React.useState(true);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div className={classes.root}>
      {/* <Snackbar
        open={open}
        message={"I am snackbar"}
        onClose={handleClose}
        variant={"success"}
      /> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            STEPIN
          </Typography>
          <Button color="inherit" onClick={() => onRefresh()}>
            Refresh
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderNavbar;
