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
						<NavLink
							style={{ color: "white" }}
							onClick={props.getModeInitializer()}>
							Home
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							style={{ color: "white" }}
							onClick={props.getModeInitializer("MYPAGE")}>
							My page
						</NavLink>
					</NavItem>
					<NavItem>
						{props.user.isLoggedIn ? (
							<NavLink
								onClick={props.handleLogout}
								href="/"
								style={{ color: "white" }}>
								Logout
							</NavLink>
						) : (
							<React.Fragment>
								<NavLink
									href="/login"
									style={{ color: "white" }}
									onClick={props.getAppModeHandler("LOGIN")}>
									Login
								</NavLink>
								<NavLink
									href="/register"
									style={{ color: "white" }}
									onClick={props.getAppModeHandler(
										"REGISTER"
									)}>
									Register
								</NavLink>
							</React.Fragment>
						)}
					</NavItem>
				</Nav>
			</Collapse>
			<NavbarBrand
				href="/"
				onClick={props.getAppModeHandler("HOME")}
				className="m-auto">
				Jinsol
			</NavbarBrand>
			<Button
				style={{
					background: "transparent",
					border: "0px",
					width: "50px",
					padding: "5px"
				}}
				onClick={props.getAppModeHandler("MESSENGER_LIST")}>
				<img style={{ width: "100%" }} src="/email.png"></img>
			</Button>
		</Navbar>
	);
};

export default AppBar;
