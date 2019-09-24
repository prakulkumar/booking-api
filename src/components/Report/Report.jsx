import React from "react";

import "./Report.scss";

const Report = () => {
  return (
    <div className="report">
      <div className="report__container">
        <div className="report__header-primary">
          <h2>RECEIPT</h2>
          <div>
            <h2>[HOTEL NAME]</h2>
            <p>[ADDRESS]</p>
          </div>
        </div>
        <div className="report__section">
          <div className="report-row">
            <span className="report-key">Booking Id</span>
            <span className="report-value">123_abc_hotel</span>
          </div>
          <div className="report-row">
            <span className="report-key">Booking Date</span>
            <span className="report-value">22 nd Sept</span>
          </div>
        </div>
        <div className="report__header-secondary">GUEST DETAILS</div>
        <div className="report__section">
          <div className="report-row">
            <span className="report-key">Name</span>
            <span className="report-value">Mr. Name</span>
          </div>
          <div className="report-row">
            <span className="report-key">Contact Number</span>
            <span className="report-value">9988998899</span>
          </div>
        </div>
        <div className="report__header-secondary">BOOKING DETAILS</div>
        <div className="report__section">
          <div className="report-row">
            <span className="report-key">Check In</span>
            <span className="report-value">20 Sept</span>
          </div>
          <div className="report-row">
            <span className="report-key">Check In Time</span>
            <span className="report-value">2:00 pm</span>
          </div>
          <div className="report-row">
            <span className="report-key">Check Out</span>
            <span className="report-value">25th Sept</span>
          </div>
          <div className="report-row">
            <span className="report-key">Check Out Time</span>
            <span className="report-value">11:00 am</span>
          </div>
          <div className="report-row">
            <span className="report-key">No of Rooms</span>
            <span className="report-value">3</span>
          </div>
          <div className="report-row">
            <span className="report-key">No of Guests</span>
            <span className="report-value">3</span>
          </div>
          <div className="report-row">
            <span className="report-key">No of Nights</span>
            <span className="report-value">5</span>
          </div>
        </div>
        <div className="report__header-secondary">AMOUNT</div>
        <div className="report__section">
          <div className="report-row">
            <span className="report-key">Amount</span>
            <span className="report-value">10,000</span>
          </div>
          <div className="report-row">
            <span className="report-key">Tax</span>
            <span className="report-value">3%</span>
          </div>
          <div className="report-row">
            <span className="report-key">Total</span>
            <span className="report-value">11,000</span>
          </div>
          <div className="report-row">
            <span className="report-key">Advance</span>
            <span className="report-value">2000</span>
          </div>
          <div className="report-row">
            <span className="report-key">Balance</span>
            <span className="report-value">9000</span>
          </div>
        </div>
        {/* <div className="report__section">
        {booking.payment.payment.payment.cashPayment !== 0 ? (
          <div className="report-row">
            <span className="report-key">Paid By Cash</span>
            <span className="report-value">
              {booking.payment.payment.payment.cashPayment}
            </span>
          </div>
        ) : null}
        {booking.payment.payment.payment.cardPayment !== 0 ? (
          <div className="report-row">
            <span className="report-key">Paid By Card</span>
            <span className="report-value">
              {booking.payment.payment.payment.cardPayment}
            </span>
          </div>
        ) : null}
        {booking.payment.payment.payment.walletPayment !== 0 ? (
          <div className="report-row">
            <span className="report-key">Paid By Wallet</span>
            <span className="report-value">
              {booking.payment.payment.payment.walletPayment}
            </span>
          </div>
        ) : null}
      </div> */}
      </div>
    </div>
  );
};

export default Report;
