import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
const Nav = () =>  
<Navbar bg="info" variant="dark" expand="lg">
  <Navbar.Brand as={Link} to="/">Agila Retro <span>🦅</span></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Button variant="info" as={Link } to="/retro">Retro</Button>
  </Navbar.Collapse>
</Navbar>

export default Nav;
