import React from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  inputItems: {
    width: "70%"
  },
  span: {
    color: "#f50057"
  }
}));

const Taxes = ({ onClose }) => {
  const classes = useStyles();
  const taxes = [
    { _id: 1, greaterThan: 0, lessThanAndEqual: 2000, taxPercent: 3 },
    { _id: 2, greaterThan: 2000, lessThanAndEqual: 5000, taxPercent: 10 },
    { _id: 3, greaterThan: 5000, taxPercent: 18 }
  ];

  return (
    <React.Fragment>
      <DialogTitle>Tax Slabs</DialogTitle>
      <DialogContent>
        {taxes.map(taxInfo => (
          <div key={taxInfo._id} className={classes.formGroup}>
            <Typography
              display={"block"}
              nowrap={"true"}
              className={classes.inputItems}
            >
              {/* {"Greater than "(
                <span className={classes.span}>{taxInfo.greaterThan}</span>
              )(
                taxInfo.lessThanAndEqual
                  ? "and less than equal to "(
                      <span className={classes.span}>
                        {taxInfo.lessThanAndEqual}
                      </span>
                    )
                  : ""
              )}
              } */}
              Greater Than{" "}
              {<span className={classes.span}>{taxInfo.greaterThan}</span>}{" "}
              {taxInfo.lessThanAndEqual ? "and less than equal to " : ""}
              {taxInfo.lessThanAndEqual && (
                <span className={classes.span}>{taxInfo.lessThanAndEqual}</span>
              )}
            </Typography>
            <Typography>:</Typography>
            <Typography>{`${taxInfo.taxPercent}%`}</Typography>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default Taxes;
