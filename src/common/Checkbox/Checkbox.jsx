import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControl, FormControlLabel, FormGroup } from "@material-ui/core";

const CustomCheckbox = ({ label }) => {
  const [checked, setState] = React.useState(false);

  const handleChange = event => {
    console.log(event.target.checked);
    setState(event.target.checked);
  };

  return (
    <FormControl component="fieldset">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={checked} onChange={handleChange} value="gilad" />
          }
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CustomCheckbox;
