/* eslint-disable*/
import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import "./MessageBox.css";
import { BrowserRouter } from "react-router-dom";
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
	Form,
	FormGroup,
	Input
} from "reactstrap";
const MessageBoxPartner = props => {
	return (
		<Row className="mt-2 mb-2">
			{/* 상대가 보냄 */}
			<Col xs="2">
				<img src="/profile.png" style={{ width: "100%" }}></img>
			</Col>
			<Col xs="10" className="pl-0">
				<div>{props.message.sender.nickname}</div>
				<div className="partner-message-box">{props.message.data}</div>
			</Col>
		</Row>
	);
};

export default MessageBoxPartner;
