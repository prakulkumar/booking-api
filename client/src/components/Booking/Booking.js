import React, {
    Component
} from 'react';

class Booking extends Component {

    state = {
        validated: false,
        hotelBookingForm: {
            step: 1,
            firstName: '',
            lastName: '',
            address: '',
            checkIn: '',
            checkOut: '',
            adults: '',
            children: 0,
            contactNumber: '',
            rooms: [],
            amount: '',
            advance: ''
        },
        cancel: false,
        checkedIn: false,
        checkedOut: false,
        availableRooms: [],
        formIsValid: true,
        isEdit: false,
        bookingId: null,
        personId: null,
        disable: false,
        misc: '',
        total: '',
        balance: '',
        status: ''
    }

    componentDidMount() {
        if (this.props.showModal) {
            console.log('%c props', 'color: red', this.props)
            let disable = false;
            if (this.props.status === 'viewBooking') {
                let data = this.props.detailsForForm.booking;
                let form = {
                    step: 1,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    checkIn: new Date(data.checkIn),
                    checkOut: new Date(data.checkOut),
                    adults: data.adults,
                    children: data.children,
                    contactNumber: data.contactNumber,
                    rooms: data.rooms,
                    amount: data.amount,
                    advance: data.advance
                }

                this.setState({
                    hotelBookingForm: form,
                    disable: true,
                    bookingId: data._id,
                    misc: data.misc,
                    balance: data.balance,
                    cancel: data.cancel,
                    checkedIn: data.checkedIn,
                    checkedOut: data.checkedOut,
                    status: this.props.status
                });

                // this.getAvailableRooms(new Date(data.checkIn), new Date(data.checkOut));
            } else {
                let updatedForm = {
                    ...this.state.hotelBookingForm
                };
                updatedForm.checkIn = this.props.detailsForForm.date;
                this.setState({
                    hotelBookingForm: updatedForm,
                    status: this.props.status
                });
            }
        }
    }

    render() {
        return <React.Fragment >
    
        </React.Fragment>
    }
}

export default Booking;