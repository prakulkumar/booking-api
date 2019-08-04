import React, { Component } from 'react'
import './BookingDetails.css';
import { Form, Modal, Button } from 'react-bootstrap';
class BookingDetails extends Component {
    state = {
        payment: {
            amount: 0,
            advance: 0,
            balance: 0,
            misc: 0
        },
        cardDisable: true,
        cashDisable: true,
        walletDisable: true
    }

    getPayment = () => {
        const payment = {
            cashPayment: this.state.cashDisable ? Number(document.getElementById('cash_input').value) : 0,
            cardPayment: this.state.cardDisable ? Number(document.getElementById('card_input').value) : 0,
            walletPayment: this.state.walletDisable ? Number(document.getElementById('wallet_input').value) : 0
        }

        this.props.generateReport({ ...this.state.payment, payment });
    }

    onChange = (event) => {
        if (event.target.id === "card") {
            this.setState({ cardDisable: !this.state.cardDisable });
            document.getElementById('card_input').value = null;
        } else if (event.target.id === "cash") {
            this.setState({ cashDisable: !this.state.cashDisable });
            document.getElementById('cash_input').value = null;
        } else if (event.target.id === "wallet") {
            this.setState({ walletDisable: !this.state.walletDisable });
            document.getElementById('wallet_input').value = null;
        }
    }

    render() {
        return <React.Fragment>
            <div className="taxInfo">
                <div className="taxInfo__container">
                    <div>
                        <input type="checkbox" id="withTax" className="bookingDetails__input" onChange={() => this.onChange(event)} />
                        <label for="withTax" className="bookingDetails__label">
                            <span className="bookingDetails__checkbox"></span>
                            <span>With Tax</span>
                        </label>
                    </div>

                    <div>
                        <input type="checkbox" id="withoutTax" className="bookingDetails__input" onChange={() => this.onChange(event)} />
                        <label for="withoutTax" className="bookingDetails__label">
                            <span className="bookingDetails__checkbox"></span>
                            <span>Without Tax</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="bookingDetails__container">
                <div className="bookingDetails__info">
                    <div className="bookingDetails__row">
                        <span className="bookingDetails__left">Room Charges</span>
                        <span className="bookingDetails__colon">:</span>
                        <span className="bookingDetails__right">{this.props.booking.amount}</span>
                    </div>
                    <div className="bookingDetails__row">
                        <span className="bookingDetails__left">Advance</span>
                        <span className="bookingDetails__colon">:</span>
                        <span className="bookingDetails__right">{this.props.booking.advance}</span>
                    </div>
                    <div className="bookingDetails__row">
                        <span className="bookingDetails__left">Other Charges</span>
                        <span className="bookingDetails__colon">:</span>
                        <span className="bookingDetails__right">0</span>
                    </div>
                    <div className="bookingDetails__row">
                        <span className="bookingDetails__left">Balance</span>
                        <span className="bookingDetails__colon">:</span>
                        <span className="bookingDetails__right">{this.props.booking.balance}</span>
                    </div>
                </div>

                <div className="bookingDetails__hr"></div>

                <div className="bookingDetails__payment">
                    <div className="bookingDetails__row">
                        <div>
                            <input type="checkbox" id="cash" className="bookingDetails__input" onChange={() => this.onChange(event)} />
                            <label for="cash" className="bookingDetails__label">
                                <span className="bookingDetails__checkbox"></span>
                                <span>Cash Payment</span>
                            </label>
                        </div>

                        <Form.Control type="number" id="cash_input" placeholder="Amount" className="bookingDetails__formInput" disabled={this.state.cashDisable} />
                    </div>

                    <div className="bookingDetails__row">
                        <div>
                            <input type="checkbox" id="card" className="bookingDetails__input" onChange={() => this.onChange(event)} />
                            <label for="card" className="bookingDetails__label">
                                <span className="bookingDetails__checkbox"></span>
                                <span>Card Payment</span>
                            </label>
                        </div>

                        <Form.Control type="number" id="card_input" placeholder="Amount" className="bookingDetails__formInput" disabled={this.state.cardDisable} />
                    </div>

                    <div className="bookingDetails__row">
                        <div>
                            <input type="checkbox" id="wallet" className="bookingDetails__input" onChange={() => this.onChange(event)} />
                            <label for="wallet" className="bookingDetails__label">
                                <span className="bookingDetails__checkbox"></span>
                                <span>Wallet Payment</span>
                            </label>
                        </div>

                        <Form.Control type="number" id="wallet_input" placeholder="Amount" className="bookingDetails__formInput" disabled={this.state.walletDisable} />
                    </div>
                </div>
            </div>

            <Modal.Footer>
                <Button variant="primary" onClick={() => this.getPayment()}>Generate Report</Button>
            </Modal.Footer>
        </React.Fragment>
    }
}

export default BookingDetails;
