/* eslint-disable*/
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter } from "react-router-dom";
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

import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyPage from "./MyPage";
import MessengerDetail from "./Messenger/MessengerDetail";
import MessengerList from "./Messenger/MessengerList";
import MeetingPage from "./MeetingPage/MeetingPage";
import MeetingSetting from "./MeetingSetting/MeetingSetting";
require("dotenv").config();
const App = props => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar
				color="faded"
				light
				fixed="top"
				style={{
					height: "70px",
					borderBottom: "1px solid lightgray",
					background: "white"
				}}>
				<NavbarToggler
					onClick={toggleNavbar}
					style={{ border: "0px" }}
				/>
				<Collapse
					isOpen={!collapsed}
					navbar
					style={{
						position: "absolute",
						top: "70px",
						background: "rgb(0,0,0,0.5)",
						borderRadius: "0px 0px 8px 8px",
						paddingLeft: "8px",
						paddingRight: "8px"
					}}>
					<Nav navbar>
						<NavItem>
							<NavLink href="/" style={{ color: "white" }}>
								Home
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/mypage/" style={{ color: "white" }}>
								My page
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/login" style={{ color: "white" }}>
								Login
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
				<NavbarBrand href="/" className="m-auto">
					Jinting
				</NavbarBrand>
				<Button
					onClick={() => {
						window.location.href = "/messenger-list";
					}}>
					Msg
				</Button>
			</Navbar>
			{/* https://stackoverflow.com/questions/20562860/how-do-i-vertically-center-an-h1-in-a-div/20563075 */}

			{/* Navbar 때문에 자리 채우기 */}
			<div style={{ width: "90%", height: "70px" }}></div>
			<BrowserRouter>
				<Route exact path="/" component={MainPage}></Route>
				<Route exact path="/login" component={LoginPage}></Route>
				<Route exact path="/register" component={RegisterPage}></Route>
				<Route exact path="/mypage" component={MyPage}></Route>
				<Route
					exact
					path="/meeting-page"
					component={MeetingPage}></Route>
				<Route
					exact
					path="/meeting-setting"
					component={MeetingSetting}></Route>
				<Route
					exact
					path="/messenger-list"
					component={MessengerList}></Route>
				<Route
					exact
					path="/messenger-detail"
					component={MessengerDetail}></Route>
				{/* <Route exact path="/signup" component={SignupPage}></Route> */}
			</BrowserRouter>

			{/* Footer */}
			<Container fluid={true}>
				<Row style={{ background: "black" }} className="pt-5 pb-3">
					<Container>
						<p style={{ textAlign: "center", color: "white" }}>
							Copyright reserved by umi, 2020
						</p>
					</Container>
				</Row>
			</Container>
		</div>
	);
};

export default App;
