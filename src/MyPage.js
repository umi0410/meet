/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount, setChatRoom } from "./store/modules/user";
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
class MyPage extends Component {
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
								<br></br>
							</p>

							<h6 style={{ textAlign: "center" }}>
								{this.props.user.isEmailVerified ? (
									<Badge className="badge-success" style={{}}>
										학교인증
									</Badge>
								) : (
									<Badge
										className="badge-secondary-outline"
										style={{}}>
										학교미인증
									</Badge>
								)}
								<Badge className="badge-secondary-outline">
									소개팅정보
								</Badge>
								<Badge
									className="badge-secondary-outline"
									style={{
										border: "1px solid " + likesColor,
										background: likesColor,
										color: "white"
									}}>
									우수평가
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
	getAccount: () => dispatch(getAccount()),
	setChatRoom: chatRoom => dispatch(setChatRoom(chatRoom))
});
// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
