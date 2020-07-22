import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/user/actions";

export default function Navigation() {
  const dispatch = useDispatch();

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        PROJECT NAME
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <Nav.Item>
            <Nav.Link exact as={NavLink} to="/">
              Home
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="/other">
              Other
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/signup">
              Sign up
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          </Nav.Item>

          <Button onClick={() => dispatch(logOut())}>Logout</Button>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
