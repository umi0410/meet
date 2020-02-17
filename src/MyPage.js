/* eslint-disable*/
import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import utils from "./utils";
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
class MyPage extends Component {
	constructor(props) {
		super(props);
		this.state = { token: utils.extractCookies("token") };
	}
	componentDidMount() {}
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		return (
			<React.Fragment>
				<Container className="mt-4 mb-4">
					<Row className=" justify-content-center">
						<Col xs="6">
							<img
								src="/love.png"
								style={{ width: "100%" }}></img>
						</Col>
					</Row>
					<Row>
						<Col>
							<p style={{ textAlign: "center" }}>
								<span style={{ fontWeight: "bold" }}>
									{this.props.user.nickname
										? this.props.user.nickname
										: "로그인해주세요"}
								</span>
								<span style={{ color: "gray" }}>님</span>
								{this.props.user.meetingStatus ==
									"UNQUALIFIED" && (
									<Badge
										className="ml-2 badge-secondary-outline"
										style={{}}>
										소개팅조건 미달
									</Badge>
								)}
								{this.props.user.meetingStatus == "WAITING" && (
									<Badge
										className="ml-2  badge-success badge badge-success-outline"
										style={{}}>
										서비스 대기중
									</Badge>
								)}
								{this.props.user.meetingStatus == "ONGOING" && (
									<Badge
										className="badge-secondary-outline"
										style={{
											border: "1px solid " + likesColor,
											background: likesColor,
											color: "white"
										}}>
										소개팅 진행
									</Badge>
								)}
								<br></br>
							</p>

							<h6 style={{ textAlign: "center" }}>
								{!this.props.user.isEmailVerified && (
									<Badge
										className="badge-secondary-outline"
										style={{}}>
										학교메일미인증
									</Badge>
								)}
								<Badge
									className="badge-secondary-outline"
									style={{
										border: "1px solid " + likesColor,
										background: likesColor,
										color: "white"
									}}>
									우수회원
								</Badge>
							</h6>
							<p style={{ textAlign: "center" }}>
								<span style={{ color: "gray" }}>
									남은 하트 :{" "}
								</span>
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
									<a
										className="mypageList"
										href="./profile-edit">
										나의 정보 수정
									</a>
								</li>
								<li style={{ width: "60%", margin: "auto" }}>
									<a
										className="mypageList"
										href="/meeting-setting"
										onClick={this.props.getAppModeHandler(
											"MEETING_SETTING"
										)}>
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
	}
}

export default MyPage;
