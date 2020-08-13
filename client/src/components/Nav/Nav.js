import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
const Nav = () =>  
<Navbar bg="info" variant="dark" expand="lg">
  <Navbar.Brand href="/">Agila Retro 🦅</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Button variant="info" href="/retro">Retro</Button>
  </Navbar.Collapse>
</Navbar>

export default Nav;
