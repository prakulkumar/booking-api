import React from "react";
import { Card, CardContent, CardHeader, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./Card.scss";

const useStyles = makeStyles(props => ({
  card: {
    minWidth: props.minWidth || 275,
    margin: props.margin || "0 auto"
  }
}));

const CustomCard = props => {
  const classes = useStyles(props);
  return (
    <Card className={classes.card}>
      <CardHeader>{props.cardHeader}</CardHeader>
      <CardContent>{props.cardContent}</CardContent>
      <CardActions>{props.cardContent}</CardActions>
    </Card>
  );
};

export default CustomCard;
