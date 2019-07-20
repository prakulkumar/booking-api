import React, { Component } from 'react';
import './grid.css';
import dateFNS from 'date-fns';
import { Tooltip, OverlayTrigger, Navbar } from 'react-bootstrap';
import HotelBookingForm from '../HotelBookingForm/HotelBookingForm';
import axios from 'axios';

class Grid extends Component {
    state = {
        showModal: false,
        items: [],
        rooms: [],
        monthObj: {},
        bookingArray: [],
        loading: true,
        detailsForForm: {}
    }

    getRandomColor = () => {
        var lum = -0.25;
        var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        var rgb = "#",
            c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2, 2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00" + c).substr(c.length);
        }
        return rgb;
    }

    componentDidMount = async () => {
        const date = new Date();
        const monthObj = {
            monthNumber: dateFNS.getMonth(date),
            year: dateFNS.getYear(date),
            numberOfDays: dateFNS.getDaysInMonth(date)
        }

        this.setState({ monthObj, rooms: (await this.getRooms()).data });

        const tempArray = new Array(this.state.rooms.length);
        this.finalArray(tempArray, this.state.monthObj);
        this.setBookingsForMonth(this.state.monthObj);
    }

    getBookings = async (monthObj) => {
        try {
            return await axios.post('/bookings/filterByMonth', monthObj);
        } catch (error) {
            console.log(error);
        }
    }

    getRooms = async () => {
        try {
            return await axios.get('/rooms');
        } catch (error) {
            console.log(error);
        }
    }

    finalArray = (tempArray, monthObj) => {
        for (let i = 0; i < tempArray.length; i++) {
            tempArray[i] = new Array(monthObj.numberOfDays)
                .fill({
                    roomNumber: this.state.rooms[i].roomNumber,
                    roomId: this.state.rooms[i]._id
                });
            tempArray[i].unshift({ showRoomNumber: this.state.rooms[i].roomNumber });
        }

        this.setState({ items: tempArray });
    }

    // cloning = (values) => {
    //     let newValues = [...values];
    //     newValues.forEach((value, index) => {
    //         let updatedValue = [...value];
    //         updatedValue[0] = { ...updatedValue[0] };
    //         newValues[index] = updatedValue;
    //     });

    //     return newValues;
    // }

    setBookingsForMonth = (monthObj) => {
        this.getBookings(monthObj).then(result => {
            if (result.status === 200) {
                result.data.forEach(booking => {
                    if (booking.months.length === 1) this.setBookingForMonth(booking);
                    else if (booking.months.length > 1) this.setBookingForMonths(booking);
                });
                this.setState({ loading: false });
            };
        });
    }

    setBookingForMonth = (booking) => {
        let color = this.getRandomColor();
        let checkIn = new Date(booking.checkIn);
        let checkOut = new Date(booking.checkOut);
        booking.rooms.forEach(roomId => {
            this.setBookedRooms(roomId, checkIn, checkOut, color, booking);
        });
    }

    setBookingForMonths = (booking) => {
        let checkIn, checkOut;
        let color = this.getRandomColor();
        let monthObj = this.state.monthObj;
        let index = booking.months.findIndex(month => month.monthNumber === monthObj.monthNumber);

        if (index === 0) {
            checkIn = new Date(booking.checkIn);
            checkOut = new Date(`${monthObj.monthNumber + 1}/${monthObj.numberOfDays}/${monthObj.year}`)
        }

        else if (index === booking.months.length - 1) {
            checkIn = new Date(`${monthObj.monthNumber + 1}/1/${monthObj.year}`);
            checkOut = new Date(booking.checkOut);
        }

        else {
            checkIn = new Date(`${monthObj.monthNumber + 1}/1/${monthObj.year}`);
            checkOut = new Date(`${monthObj.monthNumber + 1}/${monthObj.numberOfDays}/${monthObj.year}`);
        }

        booking.rooms.forEach(roomId => {
            this.setBookedRooms(roomId, checkIn, checkOut, color, booking);
        });
    }

    setBookedRooms = (roomId, checkIn, checkOut, color, booking) => {
        let bookedRoom = this.state.rooms.find(room => room._id === roomId);
        let items = [...this.state.items];
        let item = items.find(item => item[0].showRoomNumber === bookedRoom.roomNumber);
        let dates = dateFNS.eachDay(checkIn, checkOut);

        dates.forEach(date => {
            let dateNumber = dateFNS.getDate(date);
            item[dateNumber] = {
                ...item[dateNumber],
                booking: booking,
                showBooking: true,
                name: `${booking.firstName} ${booking.lastName}`,
                color
            };
        });

        this.setState({ items });
    }

    showModalHandler = (subitem, dayOfMonth) => {
        const monthObj = this.state.monthObj;
        subitem.date = new Date(monthObj.year, monthObj.monthNumber, dayOfMonth);
        this.setState({ detailsForForm: subitem, showModal: true });
    }

    closeModalHandler = () => {
        this.setState({ showModal: false });
    }

    handleBookings = () => {
        console.log('handle booking');
        this.setBookingsForMonth(this.state.monthObj);
    }

    modalStatus = () => {
        return this.state.detailsForForm.showBooking ? 'viewBooking' : 'newBooking';
    }

    changeMonth = (value) => {
        this.setState({ loading: true });
        const monthObj = { ...this.state.monthObj };
        const newMonthDate = dateFNS.addMonths(new Date(monthObj.year, monthObj.monthNumber), value);
        monthObj.monthNumber = dateFNS.getMonth(newMonthDate);
        monthObj.numberOfDays = dateFNS.getDaysInMonth(newMonthDate);
        monthObj.year = dateFNS.getYear(newMonthDate);

        this.setState({ monthObj });

        const tempArray = new Array(this.state.rooms.length);
        this.finalArray(tempArray, monthObj);
        this.setBookingsForMonth(monthObj);
    }

    getNameOfMonth = () => {
        return dateFNS.format(new Date(this.state.monthObj.year, this.state.monthObj.monthNumber), 'MMMM').toUpperCase();
    }

    renderShortName = (name) => {
        const shortName = name.split(' ');
        return shortName[0].charAt(0) + shortName[1].charAt(0);
    }

    setClassForCell = (subitemIndex) => {
        let date = dateFNS.getDate(new Date());
        let month = dateFNS.getMonth(new Date());
        return subitemIndex < date && month === this.state.monthObj.monthNumber ? 'template_subitem noselect pointerCursor disable-cell' : 'template_subitem noselect pointerCursor';
    }

    tooltipPlacement = (itemIndex) => {
        return itemIndex === 0 || itemIndex === 1 ? 'bottom' : 'top';
    }

    setClassForNavigatingMonth = () => {
        let month = dateFNS.getMonth(new Date());
        return month === this.state.monthObj.monthNumber ? "fa fa-chevron-left disableMonthNav" : "fa fa-chevron-left pointerCursor";
    }

    renderOverlay = () => {
        return (this.state.loading ?
            <div className="template_overlay">
                <div className="template_overlay__container">
                    <div className="spinner-border text-light" role="status"></div>
                </div>
            </div>
            : null)
    }

    renderItems = () => {
        return this.state.items.map((item, itemIndex) =>
            <div className="template_item" key={'item' + itemIndex}>
                {item.map((subitem, subitemIndex) =>
                    subitem.showBooking ?
                        <OverlayTrigger placement={this.tooltipPlacement(itemIndex)} key={'subitem' + subitemIndex}
                            overlay={<Tooltip id={`tooltip-${this.tooltipPlacement(itemIndex)}`}>{subitem.name}</Tooltip>}>
                            <div className={this.setClassForCell(subitemIndex)} style={{ color: subitem.color, background: 'rgb(240,255,255)', fontWeight: 'bold' }} onClick={() => this.showModalHandler(subitem, subitemIndex)}>{this.renderShortName(subitem.name)}</div>
                        </OverlayTrigger> :
                        subitem.showRoomNumber ?
                            <div className="template_subitem noselect importantCells" key={'subitem' + subitemIndex}>{subitem.showRoomNumber}</div>
                            : <div key={'subitem' + subitemIndex} className={this.setClassForCell(subitemIndex)} onClick={() => this.showModalHandler(subitem, subitemIndex)}>
                                <div className="template_subitem_showOnHover">{subitem.roomNumber}</div>
                            </div>
                )}
            </div>
        )
    }

    render() {
        let newRow = [];
        if (this.state.monthObj.numberOfDays) {
            newRow = new Array(this.state.monthObj.numberOfDays + 1);
            for (let i = 0; i < newRow.length; i++) {
                if (i !== 0) { newRow[i] = { date: i } } else { newRow[i] = {} }
            }
        }

        return (
            <div className="template_container">
                {this.renderOverlay()}
                {this.state.monthObj.year ? <div style={{ height: '100%' }}>
                    <Navbar bg='light' className="app__navbar">
                        <i className={this.setClassForNavigatingMonth()} onClick={() => this.changeMonth(-1)}></i>
                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{this.getNameOfMonth()} {this.state.monthObj.year}</div>
                        <i className="fa fa-chevron-right pointerCursor" onClick={() => this.changeMonth(1)}></i>
                    </Navbar>
                    <div className="template_item noselect">{newRow.map((subitem) =>
                        <div key={`app__${subitem.date}`} className="template_subitem importantCells">
                            {subitem.date < 10 ? '0' + subitem.date : subitem.date}
                        </div>)}
                    </div>
                    <div className="template_item__container">{this.renderItems()}</div>

                    {this.state.showModal ? <HotelBookingForm
                        detailsForForm={this.state.detailsForForm}
                        showModal={this.state.showModal}
                        onClose={this.closeModalHandler}
                        handleBookings={this.handleBookings}
                        status={this.modalStatus()}
                        rooms={this.state.rooms}>
                    </HotelBookingForm> : null}
                </div> : null}
            </div>
        )
    }
}

export default Grid;