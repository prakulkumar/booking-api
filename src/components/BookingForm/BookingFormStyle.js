import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  formGroup: {
    display: "flex"
  },
  button: {
    margin: theme.spacing(1)
  },
  panel: {
    width: "100%",
    margin: "8% 0 auto"
  },
  panelHeading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  accordianHeader: {
    backgroundColor: "#eeeeee"
  }
}));
