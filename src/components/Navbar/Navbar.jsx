import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

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
  },
  buttonTaxes: {
    marginRight: 20
  }
}));

const HeaderNavbar = ({ onRefresh, path, onRedirectFromNavbar, showTaxes }) => {
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
          <Button
            className={classes.buttonTaxes}
            color="inherit"
            onClick={() => showTaxes()}
          >
            Taxes
          </Button>
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
