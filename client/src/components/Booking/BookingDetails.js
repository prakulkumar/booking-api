import React from 'react';
import './BookingDetails.css';
import { Form, Modal, Button } from 'react-bootstrap';

const bookingDetails = (props) => {
    console.log(props);
    return <React.Fragment>
        <div className="bookingDetails__container">
            <div className="bookingDetails__info">
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Room Charges</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{props.booking.amount}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Advance</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{props.booking.advance}</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Other Charges</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">0</span>
                </div>
                <div className="bookingDetails__row">
                    <span className="bookingDetails__left">Balance</span>
                    <span className="bookingDetails__colon">:</span>
                    <span className="bookingDetails__right">{props.booking.balance}</span>
                </div>
            </div>

            <div className="bookingDetails__hr"></div>

            <div className="bookingDetails__payment">
                <div className="bookingDetails__row">
                    <div>
                        <input type="checkbox" id="cash" className="bookingDetails__input" />
                        <label for="cash" className="bookingDetails__label">
                            <span className="bookingDetails__checkbox"></span>
                            <span>Cash Payment</span>
                        </label>
                    </div>

                    <Form.Control type="text" placeholder="Amount" className="bookingDetails__formInput" />
                </div>

                <div className="bookingDetails__row">
                    <div>
                        <input type="checkbox" id="card" className="bookingDetails__input" />
                        <label for="card" className="bookingDetails__label">
                            <span className="bookingDetails__checkbox"></span>
                            <span>Card Payment</span>
                        </label>
                    </div>

                    <Form.Control type="text" placeholder="Amount" className="bookingDetails__formInput" />
                </div>

                <div className="bookingDetails__row">
                    <div>
                        <input type="checkbox" id="wallet" className="bookingDetails__input" />
                        <label for="wallet" className="bookingDetails__label">
                            <span className="bookingDetails__checkbox"></span>
                            <span>Wallet Payment</span>
                        </label>
                    </div>

                    <Form.Control type="text" placeholder="Amount" className="bookingDetails__formInput" />
                </div>
            </div>
        </div>

        <Modal.Footer>
            <Button variant="primary">Generate Reciept</Button>
        </Modal.Footer>
    </React.Fragment>
};

export default bookingDetails;