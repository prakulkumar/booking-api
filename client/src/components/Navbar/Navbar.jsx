import React from "react";
import "./Navbar.scss";

import { Navbar } from "react-bootstrap";

const HeaderNavbar = ({ onRefresh }) => {
  return (
    <Navbar bg="dark" className="navbar__mainContainer">
      <div>STEPIN</div>
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={() => onRefresh()}
      >
        REFRESH
      </button>
    </Navbar>
  );
};

export default HeaderNavbar;
