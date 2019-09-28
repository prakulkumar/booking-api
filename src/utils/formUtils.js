import React from "react";
import Joi from "joi-browser";
import { Button } from "@material-ui/core";

import Input from "../common/Input/Input";
import Select from "../common/Select/Select";
import DatePicker from "../common/DatePicker/DatePicker";
import RadioGroup from "../common/RadioGroup/RadioGroup";

const handleInputChange = (input, formData, formErrors, formSchema) => {
  const errors = { ...formErrors };
  const errorMessage = validateProperty(input, formSchema);
  if (errorMessage) errors[input.name] = errorMessage;
  else delete errors[input.name];

  const data = { ...formData };
  data[input.name] = input.value;

  return { data, errors };
};

const validate = (data, schema) => {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  if (!error) return null;

  const errors = {};
  for (let item of error.details) errors[item.path[0]] = item.message;
  return errors;
};

const validateProperty = ({ name, value }, formSchema) => {
  const obj = { [name]: value };
  const schema = { [name]: formSchema[name] };
  const { error } = Joi.validate(obj, schema);
  return error ? error.details[0].message : null;
};

/*
   renderInput
   parameters :- label: string
                 id: string 
                 type: object
                 value: string (required)
*/
const renderInput = (
  id,
  label,
  type,
  value,
  onInputChange,
  error,
  placeholder,
  disabled
) => {
  return (
    <Input
      disabled={disabled}
      id={id}
      name={id}
      label={label}
      type={type}
      value={value}
      onChange={onInputChange}
      error={error}
      placeholder={placeholder}
      // helperText={this.state.errors[id] ? this.state.errors[id] : ""}
    />
  );
};

const renderSelect = (id, label, type, value) => (
  <Select
    id={id}
    label={label}
    value={value}
    onChange={handleInputChange}
    // helperText={this.state.errors[id] ? this.state.errors[id] : ""}
  />
);

const renderDatepicker = (id, label, value, onInputChange, error) => (
  <DatePicker
    id={id}
    label={label}
    value={value}
    onChange={onInputChange}
    error={error}
    // helperText={this.state.errors[id] ? this.state.errors[id] : ""}
  />
);

const renderButton = (type, size, label, color, className, disabled) => {
  return (
    <Button
      disabled={disabled}
      variant="contained"
      type={type}
      size={size}
      color={color}
      className={className}
    >
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
const renderRadioGroup = (
  label,
  ariaLabel,
  name,
  value,
  onChange,
  radioButtons,
  customClass
) => (
  <RadioGroup
    label={label}
    ariaLabel={ariaLabel}
    name={name}
    value={value}
    onChange={onChange}
    radioButtons={radioButtons}
    formGroupClass={customClass}
  />
);

export default {
  handleInputChange,
  validate,
  validateProperty,
  renderInput,
  renderSelect,
  renderDatepicker,
  renderButton,
  renderRadioGroup
};
