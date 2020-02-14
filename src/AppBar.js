/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "./store/modules/user";
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
	NavLink
} from "reactstrap";

import utils from "./utils";
const AppBar = props => {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<Navbar
			color="faded"
			light
			fixed="top"
			style={{
				height: "70px",
				borderBottom: "1px solid lightgray",
				background: "white"
			}}>
			<NavbarToggler onClick={toggleNavbar} style={{ border: "0px" }} />
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
						{props.user.email ? (
							<NavLink
								onClick={() => {
									utils.deleteCookie("token");
								}}
								href="/"
								style={{ color: "white" }}>
								Logout
							</NavLink>
						) : (
							<NavLink href="/login" style={{ color: "white" }}>
								Login
							</NavLink>
						)}
					</NavItem>
				</Nav>
			</Collapse>
			<NavbarBrand href="/" className="m-auto">
				Jinsol
			</NavbarBrand>
			<Button
				style={{
					background: "transparent",
					border: "0px",
					width: "50px",
					padding: "5px"
				}}
				onClick={() => {
					window.location.href = "/messenger-list";
				}}>
				<img style={{ width: "100%" }} src="/email.png"></img>
			</Button>
		</Navbar>
	);
};
// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => ({
	...state
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
	getAccount: () => dispatch(getAccount())
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
