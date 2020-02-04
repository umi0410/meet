/* eslint-disable*/
import React, { useState, Component } from "react";
import logo from "../logo.svg";

import utils from "../utils";
import "../App.css";
import "../fonts.css";
import "../fade.css";
import "../MeetingPage/Meeting.css";
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
	Fade,
	Spinner
} from "reactstrap";
import FadeIn from "react-fade-in";
import ProfileComponent from "../Profile/ProfileComponent";
class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = { userToRead: {}, status: "loading" }; //loading, success, failed
	}

	componentDidMount() {
		this.loadProfile();
	}
	loadProfile = () => {
		//이번엔 redux안 씀. props는 그냥 부모에게 받은 것 그대로.
		fetch(
			process.env.REACT_APP_API_URL +
				`/users/${this.props.match.params.userIdToRead}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": utils.extractCookies("token")
				}
			}
		)
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				if (data.status === "success") {
					this.setState({
						...this.state,
						userToRead: data.user,
						status: data.status
					});
				} else {
					this.setState({ ...this.state, status: data.status });
				}
				return;
			})
			.catch(err => {
				console.error("Error:", err);
				console.log("Failed to read the user");
				this.setState({ ...this.state, status: "failed" });
			});
	};
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		if (this.state.status === "loading") {
			console.log(this.props);
			return (
				<Row className="justify-content-center">
					<Col xs="6" style={{ textAlign: "center" }}>
						<Spinner
							color="secondary"
							style={{
								width: "5rem",
								height: "5rem",
								marginTop: "150px",
								marginBottom: "150px"
							}}></Spinner>
					</Col>
				</Row>
			);
		} else if (this.state.status === "success") {
			return (
				<React.Fragment>
					<ProfileComponent
						user={this.state.userToRead}></ProfileComponent>
				</React.Fragment>
			);
		} else {
			return <h1>Failed</h1>;
		}
	}
}
//이번엔 redux 안 씀
export default ProfilePage;
