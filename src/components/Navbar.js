import React from 'react';
import { NavLink } from 'react-router-dom';

// Bootstrap components
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
	return (
		<Navbar bg="light" expand="lg" sticky="top">
			<Navbar.Brand href="/">My Fucking React Router Example</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink className="nav-link" exact to='/'>Home</NavLink>
					<NavLink className="nav-link" to='/about'>About</NavLink>
					<NavLink className="nav-link" to='/contact'>Contact</NavLink>
					<NavDropdown title="API" id="basic-nav-dropdown">
						<NavLink className="dropdown-item" to='/characters'>All characters</NavLink>
						<NavDropdown.Divider />
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavBar;