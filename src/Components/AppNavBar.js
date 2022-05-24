import React, { useContext, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function AppNavBar() {
  const { user } = useContext(UserContext);
 const [isCartEmpty] = useState((localStorage.getItem('isCartEmpty')))
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand className="ms-5">Zenon's shop</Navbar.Brand>
        <Navbar.Toggle href aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user.accessToken !== null && user.isAdmin !== true ? 
              
              (isCartEmpty === true) ? 
                <Nav.Link as={Link} to="/">
                  <i className="fa fa-shopping-cart" />
                </Nav.Link>
               : 
                <Nav.Link as={Link} to="/">
                  <i className="fa fa-shopping-cart  cart-value" />
                </Nav.Link>
              
             : 
                <Nav.Link as={Link} to="/" className="hidden">
                
              </Nav.Link>
            }
             <Nav.Link as={Link} to="/product">
              PRODUCTS
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              TRACK MY ORDER
            </Nav.Link>
            {user.accessToken !== null ? (
              <Nav.Link as={Link} to="/logout">
                LOGOUT
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  LOGIN
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  SIGNUP
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
