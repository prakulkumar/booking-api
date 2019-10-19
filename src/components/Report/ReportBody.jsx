import React from "react";
import utils from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import FormUtils from "../../utils/formUtils";

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: 20,
    textAlign: "right"
  },
  buttonSec: {
    marginRight: 20
  }
}));

const ReportBody = ({ booking }) => {
  const classes = useStyles();

  const getFullName = () => `${booking.firstName} ${booking.lastName}`;

  const getNumberOfGuests = () =>
    parseInt(booking.adults) + parseInt(booking.children);

  return (
    <React.Fragment>
      <div className="report">
        <div className="report__container">
          <div className="report__header-primary">
            <Typography variant="h4">RECEIPT</Typography>
            <div>
              <Typography variant="h4">{booking.hotelName}</Typography>
              <Typography variant="h6">{booking.hotelAddress}</Typography>
            </div>
          </div>
          <div className="report__section">
            <div className="report-row">
              <span className="report-key">Booking Id</span>
              <span className="report-value">123_abc_id</span>
            </div>
            <div className="report-row">
              <span className="report-key">Booking Date</span>
              <span className="report-value">
                {utils.getFormattedDate(booking.bookingDate)}
              </span>
            </div>
          </div>
          <div className="report__header-secondary">
            <Typography variant="subtitle1">GUEST DETAILS</Typography>
          </div>
          <div className="report__section">
            <div className="report-row">
              <span className="report-key">Name</span>
              <span className="report-value">{getFullName()}</span>
            </div>
            <div className="report-row">
              <span className="report-key">Contact Number</span>
              <span className="report-value">{booking.contactNumber}</span>
            </div>
          </div>
          <div className="report__header-secondary">
            <Typography variant="subtitle1">BOOKING DETAILS</Typography>
          </div>
          <div className="report__section">
            <div className="report-row">
              <span className="report-key">Check In</span>
              <span className="report-value">
                {utils.getFormattedDate(booking.checkIn)}
              </span>
            </div>
            <div className="report-row">
              <span className="report-key">Check In Time</span>
              <span className="report-value">{booking.checkedInTime}</span>
            </div>
            <div className="report-row">
              <span className="report-key">Check Out</span>
              <span className="report-value">
                {utils.getFormattedDate(booking.checkOut)}
              </span>
            </div>
            <div className="report-row">
              <span className="report-key">Check Out Time</span>
              <span className="report-value">{booking.checkedOutTime}</span>
            </div>
            <div className="report-row">
              <span className="report-key">No of Rooms</span>
              <span className="report-value">{booking.rooms.length}</span>
            </div>
            <div className="report-row">
              <span className="report-key">No of Guests</span>
              <span className="report-value">{getNumberOfGuests()}</span>
            </div>
            <div className="report-row">
              <span className="report-key">No of Nights</span>
              <span className="report-value">
                {utils.getDiffBetweenDays(booking.checkIn, booking.checkOut)}
              </span>
            </div>
          </div>
          <div className="report__header-secondary">
            <Typography variant="subtitle1">AMOUNT DETAILS</Typography>
          </div>
          <div className="report__section">
            <div className="report-row">
              <span className="report-key">Room Charges</span>
              <span className="report-value">
                &#8377; {booking.roomCharges}
              </span>
            </div>
            <div className="report-row">
              <span className="report-key">Tax</span>
              <span className="report-value">3%</span>
            </div>
            <div className="report-row">
              <span className="report-key">Total</span>
              <span className="report-value">&#8377; 11,000</span>
            </div>
            <div className="report-row">
              <span className="report-key">Advance</span>
              <span className="report-value">&#8377; {booking.advance}</span>
            </div>
            <div className="report-row">
              <span className="report-key">Balance</span>
              <span className="report-value">&#8377; {booking.balance}</span>
            </div>
          </div>
          <div className="report__header-secondary">
            <Typography variant="subtitle1">PAYMENT DETAILS</Typography>
          </div>
          <div className="report__section">
            {booking.payment.cash && (
              <div className="report-row">
                <span className="report-key">Payment By Cash</span>
                <span className="report-value">
                  &#8377; {booking.payment.cash}
                </span>
              </div>
            )}
            {booking.payment.card && (
              <div className="report-row">
                <span className="report-key">Payment By Card</span>
                <span className="report-value">
                  &#8377; {booking.payment.card}
                </span>
              </div>
            )}
            {booking.payment.wallet && (
              <div className="report-row">
                <span className="report-key">Payment By Wallet</span>
                <span className="report-value">
                  &#8377; {booking.payment.wallet}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.button}>
        {FormUtils.renderButton({
          type: "button",
          size: "large",
          label: "Print",
          color: "secondary",
          className: classes.buttonSec,
          onClick: () => {}
        })}
        {FormUtils.renderButton({
          type: "submit",
          size: "large",
          label: "Download",
          color: "primary",
          className: null,
          onClick: () => {}
        })}
      </div>
    </React.Fragment>
  );
};

export default ReportBody;
