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
	Fade
} from "reactstrap";
const MessengerList = props => {
	return (
		<React.Fragment>
			<Container fluid={true}>
				<Row
					style={{
						background: "#white",
						borderBottom: "1px solid gray"
					}}
					className="mt-2">
					<Col xs="2" className="pr-0">
						<img
							src="/profile.png"
							style={{ width: "100%" }}
							onClick={() => {
								window.location.href = "/home";
							}}></img>
					</Col>
					<Col
						xs="10"
						onClick={() => {
							window.location.href = "messenger-detail";
						}}>
						<p className="mb-1">
							<span style={{ fontWeight: "bold" }}>까꿍이 </span>
							<span style={{ fontSize: "0.8rem", color: "gray" }}>
								경희대학교
							</span>
						</p>
						<p style={{ fontSize: "0.8rem" }}>
							안녕하세요 ㅎㅎ 반가워요.
						</p>
					</Col>
				</Row>

				<Row
					style={{
						background: "#white",
						borderBottom: "1px solid gray"
					}}
					className="mt-2">
					<Col xs="2" className="pr-0">
						<img src="/profile.png" style={{ width: "100%" }}></img>
					</Col>
					<Col xs="10">
						<p className="mb-1">
							<span style={{ fontWeight: "bold" }}>까꿍이 </span>
							<span style={{ fontSize: "0.8rem", color: "gray" }}>
								경희대학교
							</span>
						</p>
						<p style={{ fontSize: "0.8rem" }}>
							안녕하세요 ㅎㅎ 반가워요.
						</p>
					</Col>
				</Row>
				<Row
					style={{
						background: "#white",
						borderBottom: "1px solid gray"
					}}
					className="mt-2">
					<Col xs="2" className="pr-0">
						<img src="/profile.png" style={{ width: "100%" }}></img>
					</Col>
					<Col xs="10">
						<p className="mb-1">
							<span style={{ fontWeight: "bold" }}>까꿍이 </span>
							<span style={{ fontSize: "0.8rem", color: "gray" }}>
								경희대학교
							</span>
						</p>
						<p style={{ fontSize: "0.8rem" }}>
							안녕하세요 ㅎㅎ 반가워요.
						</p>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};
export default MessengerList;
