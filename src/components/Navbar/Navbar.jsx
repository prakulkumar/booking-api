import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import "./Navbar.scss";

const useStyles = makeStyles(theme => ({
  stepIn: {
    display: "inline-block",
    cursor: "pointer"
  },
  root: {
    position: "fixed",
    width: "100%",
    zIndex: "1000"
  },
  title: {
    flexGrow: 1
  }
}));

const HeaderNavbar = ({ onRefresh, path, onRedirectFromNavbar }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <div onClick={onRedirectFromNavbar} className={classes.stepIn}>
              STEPIN
            </div>
          </Typography>
          {path === "/" && (
            <Button color="inherit" onClick={() => onRefresh()}>
              Refresh
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderNavbar;
