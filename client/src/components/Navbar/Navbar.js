import React from 'react';
import './Navbar.css';

import { Navbar } from 'react-bootstrap';

function HeaderNavbar(props) {
    return (
        <Navbar bg="dark" className="navbar__mainContainer">
            <div>ROOM BOOKING APP</div>
            <button type="button" className="btn btn-outline-light" onClick={() => props.refreshTrueHadler()}>REFRESH</button>
        </Navbar>
    )
}

export default HeaderNavbar;
