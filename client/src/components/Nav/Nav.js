import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
const Nav = () =>  
<Navbar bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="/">Agila Retro 🦅</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Button href="/retro">Retro</Button>
  </Navbar.Collapse>
</Navbar>

export default Nav;
