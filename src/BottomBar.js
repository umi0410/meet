import React, { useState, Component, Fragment } from "react";
import {
	Button,
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
	Row,
	Col,
	Badge,
	Fade
} from "reactstrap";
class BottomBar extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		return (
			<Fragment>
				<div
					class="bottom-margin-box"
					style={{ height: "70px", width: "90%" }}></div>
				<Navbar
					color="faded"
					light
					fixed="bottom"
					style={{
						height: "70px",
						borderBottom: "1px solid lightgray",
						background: "black"
					}}></Navbar>
			</Fragment>
		);
	}
}

export default BottomBar;
