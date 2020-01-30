/* eslint-disable*/
import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";
import "bootstrap/dist/css/bootstrap.css";
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
const MessageBoxMe = props => {
	return (
		<React.Fragment>
			<Row className="mt-2 mb-2 clearfix">
				{/* 내가 보냄 */}
				<Col xs="10" className="pr-0 float-right clearfix">
					<div className="float-right">
						{props.message.sender.nickname}
					</div>
				</Col>
				<Col xs="2" className="float-right">
					<img src="/profile.png" style={{ width: "100%" }}></img>
				</Col>
			</Row>
			<Row>
				<Col>
					<div
						className="float-right"
						style={{
							width: "fit-content",
							maxWidth: "90%",
							background: "white",
							border: "1px solid #f8f8f8",
							padding: "5px",
							wordBreak: "break-all",
							boxShadow: "0px 0px 8px 3px lightgray",
							borderRadius: "8px"
						}}>
						{props.message.data}
					</div>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default MessageBoxMe;
