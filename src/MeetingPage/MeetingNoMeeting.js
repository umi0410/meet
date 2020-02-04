/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "../store/modules/user";
import logo from "../logo.svg";

import utils from "../utils";
import "../App.css";
import "../fonts.css";
import "../fade.css";
import "./Meeting.css";
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
import FadeIn from "react-fade-in";
class MeetingNoMeeting extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		return (
			<React.Fragment>
				{/* Main introducing */}

				{/* fixed picker */}
				<Container className="mt-5 mb-5">
					<Row className="justify-content-center" style={{}}>
						<Col
							xs="8"
							style={{
								background: "url('/map.png')",
								borderRadius: "20px"
							}}>
							<div style={{ textAlign: "center" }}>
								<img
									src="/unavailable.png"
									style={{
										width: "50%",
										background: "white",
										borderRadius: "100%",
										padding: "10px"
									}}
									className="mt-4 mb-4"></img>
							</div>
						</Col>
					</Row>
					<Row
						className="justify-content-center"
						style={{ marginTop: "80px" }}>
						<Col style={{ textAlign: "center", color: "gray" }}>
							<p>
								더 이상 연결할 유저가 없습니다..
								<br />
								잠시 기다리시면 또 다른 인연이<br></br> 찾아올
								거에요!
							</p>
							<p></p>
						</Col>
					</Row>
					<Row className="justify-content-center">
						<Col xs="8">
							<Button
								block
								style={{
									background: likesColor,
									color: "white",
									border: "1px solid " + likesColor
								}}>
								친구를 초대하기
							</Button>
						</Col>
					</Row>
				</Container>
			</React.Fragment>
		);
	}
}
// props 로 넣어줄 스토어 상태값
const mapStateToProps = state => {
	return {
		...state
	};
};
// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = dispatch => ({
	login: account => dispatch(login(account)),
	getAccount: () => dispatch(getAccount())
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(MeetingNoMeeting);
