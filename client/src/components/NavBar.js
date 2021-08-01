import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav
} from 'reactstrap';

const NavBar = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [isBulbOn, setIsBulbOn] = useState();
  const [toggleCount, setCount] = useState(0);
  const [bulbURL, setBulbURL] = useState("/icons/bulb_off.png");

  const handleBulbClick = () => {
    setCount(toggleCount + 1);

    if (toggleCount > 30) {
      return;
    }

    setIsBulbOn(!isBulbOn);
    props.isBulbOn(!isBulbOn);
  }

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (localTheme === "dark") {
      setIsBulbOn(false);
    } else {
      setIsBulbOn(true);
    }
  }, []);

  useEffect(() => {
    if (isBulbOn) {
      setBulbURL("/icons/bulb_on.png");
    } else {
      setBulbURL("/icons/bulb_off.png");
    }
  }, [isBulbOn]);

  return (
    <div>
      <Navbar color="dark" dark expand="sm"
        style={{
          borderBottom: "2px solid"
        }}
      >
        <NavbarBrand href="/">Air Quality</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>

          <img src={bulbURL}
            onClick={() => handleBulbClick()}
            alt=""
            style={
              {
                width: "2.1rem",
                marginRight: "1rem"
              }
            }
          />

          <a href="https://github.com/radradef/Air-Quality">
            <div>GitHub</div>
          </a>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;