import Joi from "joi-browser";

export default {
  bookingFormSchema: {
    firstName: Joi.string()
      .required()
      .label("First Name")
      .min(3),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    address: Joi.string()
      .required()
      .label("Address"),
    checkIn: Joi.string()
      .required()
      .label("Check In"),
    checkOut: Joi.string()
      .required()
      .label("Check Out"),
    adults: Joi.number()
      .required()
      .label("Adults"),
    children: Joi.number()
      .required()
      .label("Children"),
    contactNumber: Joi.number()
      .required()
      .label("Contact Number"),
    roomCharges: Joi.number()
      .required()
      .label("Room Charges"),
    advance: Joi.number()
      .required()
      .label("Advance")
  },
  billingFormSchema: {
    card: Joi.number(),
    cash: Joi.number(),
    wallet: Joi.number()
  }
};
