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
import MessageBoxMe from "./MessageBoxMe";
import MessageBoxPartner from "./MessageBoxPartner";
const MessengerPage = props => {
	const script = document.createElement("script");

	script.src = "/utils.js";
	script.async = false;

	document.body.appendChild(script);
	return (
		<React.Fragment>
			<div style={{ background: "#f8f8f8" }}>
				{/* 주고 받은 메시지 */}
				<Container fluid={true}>
					{/* 상대방 */}
					<MessageBoxPartner></MessageBoxPartner>
					<MessageBoxMe></MessageBoxMe>
					<MessageBoxMe></MessageBoxMe>
					<MessageBoxPartner></MessageBoxPartner>
					<MessageBoxPartner></MessageBoxPartner>
					<MessageBoxMe></MessageBoxMe>
					<MessageBoxMe></MessageBoxMe>
					<MessageBoxPartner></MessageBoxPartner>
					<MessageBoxMe></MessageBoxMe>
				</Container>

				<Container fluid={true}>
					<Form>
						<FormGroup row>
							<Col xs="10" className="pr-1">
								<Input
									type="textarea"
									name="message"
									id="inputMessage"
									rows="1"
								/>
							</Col>
							<Col xs="2" className="pl-0">
								<Button block>Send</Button>
							</Col>
						</FormGroup>
						{/* 나중에 쓰셈. 인풋에 포커스 잡기. */}
						{/* <script>{function test(){
							alert("hello")
							document.querySelector("#inputMessage").scrollIntoView(false)}
							test();
							}
						</script> */}
					</Form>
				</Container>
			</div>
		</React.Fragment>
	);
};
export default MessengerPage;
