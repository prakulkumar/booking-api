import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "@material-ui/core";
import {
  DialogActions,
  DialogContent,
  DialogContentText
} from "@material-ui/core";

const CustomDialog = ({ open, onClose, title }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

CustomDialog.prototype = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default CustomDialog;
