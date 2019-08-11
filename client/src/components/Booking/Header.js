import React from 'react';
import Svg from '../../icons/open-exit-door';

import './Header.css';
import dateFNS from 'date-fns';

const header = (props) => (
    <nav className="navigation">
        <ul className="navigation__list">
            <li className="navigation__item"
                title="Edit" onClick={props.edit}>
                <span className="icon_container">
                    <i className="fa fa-pencil icon"></i>
                </span>
                <a href="#" className="navigation__link">Edit</a>
            </li>
            {/* && dateFNS.format(new Date(), 'MM/DD/YYYY') === dateFNS.format(new Date(props.checkOutDate), 'MM/DD/YYYY' )*/}
            {props.checkedIn ? (
                <li className="navigation__item"
                    title="Check Out" onClick={props.checkOut}>
                    <span className="icon_container">
                        <Svg width="20px" height="20px" />
                    </span>
                    <a href="#" className="navigation__link">Check Out</a>
                </li>
            ) : (
                    <React.Fragment>
                        <li className="navigation__item"
                            title="Cancel" onClick={props.cancel}>
                            <span className="icon_container">
                                <i className="fa fa-close icon"></i>
                            </span>
                            <a href="#" className="navigation__link">Cancel Booking</a>
                        </li>
                        <li className="navigation__item"
                            title="Check In" onClick={props.checkIn}>
                            <span className="icon_container">
                                <i className="fa fa-bed icon"></i>
                            </span>
                            <a href="#" className="navigation__link">Check In</a>
                        </li>
                    </React.Fragment>
                )}
        </ul>
    </nav>
);

export default header;