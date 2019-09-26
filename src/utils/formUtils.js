import React from "react";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";

import Input from "../common/Input/Input";
import Select from "../common/Select/Select";
import DatePicker from "../common/DatePicker/DatePicker";
import RadioGroup from "../common/RadioGroup/RadioGroup";

const handleSubmit = event => {
  event.preventDefault();
  const errors = this.validate();
  this.setState({ errors: errors || {} });

  if (errors) return;
  console.log("submitted");

  // doSubmit()
  // ......
};

const handleInputChange = ({ currentTarget: input }) => {
  const errors = { ...this.state.errors };
  const errorMessage = this.validateProperty(input);
  if (errorMessage) errors[input.name] = errorMessage;
  else delete errors[input.name];

  const data = { ...this.state.data };
  data[input.name] = input.value;

  this.setState({ data, errors });
};

const validate = () => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(this.sata.data, this.schema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

const validateProperty = ({ name, value }) => {
  const obj = { [name]: value };
  const schema = { [name]: this.schema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};

const renderInput = (id, label, type, value) => (
  <Input
    id={id}
    label={label}
    type={type}
    value={value}
    onChanged={handleInputChange}
    // helperText={this.state.errors[id] ? this.state.errors[id] : ""}
  />
);

const renderSelect = (id, label, type, value) => (
  <Select
    id={id}
    label={label}
    value={value}
    onChanged={handleInputChange}
    // helperText={this.state.errors[id] ? this.state.errors[id] : ""}
  />
);

const renderDatepicker = (id, label, type, value) => (
  <DatePicker
    id={id}
    label={label}
    value={value}
    // helperText={this.state.errors[id] ? this.state.errors[id] : ""}
  />
);

const renderButton = (size, label, color, className) => {
  return (
    <Button size={size} color={color} className={className}>
      {label}
    </Button>
  );
};

/*
   renderRadioGroup
   parameters :- label: string, 
                 ariaLabel: string 
                 formGroupClass: object
                 name: string (required)
                 value: string (required) 
                 handleChange: function (required)
                 radioButtons: array (required)
*/
const renderRadioGroup = (...args) => <RadioGroup {...args} />;

export default {
  handleSubmit,
  handleInputChange,
  validate,
  validateProperty,
  renderInput,
  renderSelect,
  renderDatepicker,
  renderButton,
  renderRadioGroup
};
