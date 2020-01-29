/* eslint-disable*/
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import "./MyPage.css";
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
const MyPage = props => {
	return (
		<React.Fragment>
			<Container className="mt-4 mb-4">
				<Row className=" justify-content-center">
					<Col xs="6">
						<img src="/love.png" style={{ width: "100%" }}></img>
					</Col>
				</Row>
				<Row>
					<Col>
						<p style={{ textAlign: "center" }}>
							<span style={{ color: "gray" }}>남은 하트 : </span>
							<span
								style={{
									fontWeight: "bold",
									color: "#f26666"
								}}>
								7
							</span>
							<span style={{ color: "#f7abab" }}> / 10</span>
						</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<ul>
							<li style={{ width: "60%", margin: "auto" }}>
								<a className="mypageList" href="./profile-edit">
									나의 정보 수정
								</a>
							</li>
							<li style={{ width: "60%", margin: "auto" }}>
								<a
									className="mypageList"
									href="/meeting-setting">
									소개팅 정보 입력
								</a>
							</li>
							<li style={{ width: "60%", margin: "auto" }}>
								<a className="mypageList" href="./settings">
									설정
								</a>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</React.Fragment>
	);
};
export default MyPage;
