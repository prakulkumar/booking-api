import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import "./Navbar.scss";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const HeaderNavbar = ({ onRefresh }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
