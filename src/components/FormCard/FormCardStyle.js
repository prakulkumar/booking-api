import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(theme => ({
  card: {
    maxWidth: 700,
    margin: "80px auto"
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
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
