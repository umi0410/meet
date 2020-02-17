/* eslint-disable*/

import React, { useState, Component, Fragment } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "./store/modules/user";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
// import { showNotification } from "./subscription";
// import "./chat";
import { Route, BrowserRouter } from "react-router-dom";
import AdSense from "react-adsense";
import { Button, Spinner, Container, Row, Col, Badge, Fade } from "reactstrap";
import utils from "./utils";

import MainPage from "./MainPage";
import AppBar from "./AppBar";
import BottomBar from "./BottomBar";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyPage from "./MyPage";
import MessengerDetail from "./Messenger/MessengerDetail";
import MessengerList from "./Messenger/MessengerList";
import MeetingPage from "./MeetingPage/MeetingPage";
import MeetingSetting from "./MeetingSetting/MeetingSetting";
import ProfilePage from "./Profile/ProfilePage";

let userInitialState = {
	isLoggedIn: false,
	email: "",
	nickname: "",
	university: "대학교",
	isEmailVerified: false,
	meetingStatus: "UNQUALIFIED",
	_id: ""
};
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isScreenVisible: true,
			user: userInitialState,
			chatRoom: {},
			mode: "LOADING" //LOADING, HOME, PROFILE, MATCHES,CHATROOM
		};
		//토큰이 존재하는 경우 로그인 시도.
		if (utils.extractCookies("token")) {
			try {
				let user = utils.parseJwt(utils.extractCookies("token"));
				fetch(process.env.REACT_APP_API_URL + `/users/login`, {
					method: "POST",
					body: JSON.stringify({ mode: "token" }),
					headers: {
						"Content-Type": "application/json",
						"x-access-token": utils.extractCookies("token")
					}
				})
					.then(res => {
						console.log(res);
						return res.json();
					})
					.then(response => {
						console.log(response);
						//아주 위험한 행위지만 일당 쿠키 그냥 박음
						document.cookie =
							"token=" +
							response.token +
							";  expires=Fri, 31 Dec 9999 23:59:59 GMT";
						let tokenDecoded = utils.parseJwt(response.token);
						// * sokcet io, serviceWorker 설정
						let socket = io.connect(process.env.REACT_APP_API_URL, {
							query: "id=" + tokenDecoded._id
						});
						//socket을 state에 담아봄
						this.setState({
							...this.state,
							socket,
							mode: "HOME",
							user: { ...response.user, isLoggedIn: true }
						});

						socket.on("connect", function(data) {
							console.log("Connected...");
						});

						//receiveMessage는 유저가 창을 띄운 경우에는 alert
						//창을 안 띄운 경우에는 푸시가 아니라 자발적으로 Notification
						socket.on("receiveMessage", data => {
							// console.log(data);
							//
							if (this.state.isScreenVisible)
								alert(
									`${data.sender.nickname}으로부터 메시지 도착\n>  ${data.data}`
								);
							else {
								console.log(`"serviceWorker" in navigator`);
								console.log("serviceWorker" in navigator);
								if ("serviceWorker" in navigator) {
									Notification.requestPermission(function(
										result
									) {
										if (result === "granted") {
											console.log("granted");
											navigator.serviceWorker.register(
												"/custom-service-worker.js"
											);
											navigator.serviceWorker.ready.then(
												function(registration) {
													console.log("reday");
													registration.showNotification(
														`${data.sender
															.nickname +
															"  sent a message"}`,
														{
															body: data.data,
															icon:
																"https://img.icons8.com/cotton/2x/like.png",
															// vibrate: [
															// 	200,
															// 	100,
															// ],
															tag:
																"vibration-sample"
														}
													);
												}
											);
										}
									});
								}
							}
						});
					})
					.catch(err => {
						console.error("Error:", err);
						alert(
							"로그인 정보가 올바르지 않습니다.\n로그아웃 후 다시 시도해주세요."
						);
					});
			} catch (e) {
				console.log(utils.deleteCookie("token"));
				console.error(e);
				console.error("token cookie 잘못됨.");
			}
		} else {
			//토큰이 없는 경우. 즉 로그아웃 상태
			this.state.mode = "HOME";
		}
	}

	componentDidMount() {
		document.addEventListener(
			"visibilitychange",
			() => {
				if (document.hidden) {
					this.setState({ ...this.state, isScreenVisible: false });
				} else {
					this.setState({ ...this.state, isScreenVisible: true });
				}
			},
			false
		);
		window.addEventListener("focus", this.handleApplicationFocus);
		window.addEventListener("blur", this.handleApplicationFocus);
	}
	loadProfilePage = event => {};
	setUserToRead = _id => {
		console.log(_id);
		this.setState({ ...this.state, userToRead: { _id } });
		window.location.href = "/profile";
	};

	//for desktop
	handleApplicationFocus = e => {
		if (e.type == "focus")
			this.setState({ ...this.state, isScreenVisible: true });
		else if (e.type == "blur")
			this.setState({ ...this.state, isScreenVisible: false });
		// console.log(e);
	};
	handleLogout = e => {
		e.preventDefault();
		utils.deleteCookie("token");
		this.setState({
			...this.state,
			mode: "HOME",
			user: { userInitialState }
		});
	};
	getAppModeHandler = mode => {
		return e => {
			if (e) e.preventDefault();
			this.setState({ ...this.state, mode: mode });
		};
	};
	getAppStateHandler = (state, argFunction) => {
		return () => {
			if (typeof argFunction == "function") argFunction();
			this.setState({ ...this.state, ...state });
		};
	};
	render() {
		if (process.env.REACT_APP_MODE != "production" || screen.width <= 900) {
			// is mobile..
			return (
				<div>
					<AppBar
						user={this.state.user}
						getAppModeHandler={this.getAppModeHandler}
						handleLogout={this.handleLogout}></AppBar>
					{/* https://stackoverflow.com/questions/20562860/how-do-i-vertically-center-an-h1-in-a-div/20563075 */}
					{/* Navbar 때문에 자리 채우기 */}
					<div style={{ width: "90%", height: "70px" }}></div>
					{/* Google Adsense */}
					{/* <AdSense.Google
						client="ca-pub-7292810486004926"
						slot="7806394673"
					/> */}
					{/* LOADING 모드일 때는 Spinner */}
					{this.state.mode == "LOADING" && (
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
					)}
					{/* LOGIN 됐을 때는 우선 미팅페이지 */}
					{this.state.mode == "HOME" &&
						(this.state.user.isLoggedIn ? (
							<MeetingPage></MeetingPage>
						) : (
							// 임시
							// <MessengerList
							// 	socket={this.state.socket}
							// 	user={this.state.user}
							// 	getAppStateHandler={
							// 		this.getAppStateHandler
							// 	}></MessengerList>
							<MainPage></MainPage>
						))}
					{this.state.mode == "LOGIN" && (
						<LoginPage
							getAppModeHandler={
								this.getAppModeHandler
							}></LoginPage>
					)}
					{this.state.mode == "REGISTER" && (
						<RegisterPage
							getAppModeHandler={
								this.getAppModeHandler
							}></RegisterPage>
					)}
					{this.state.mode == "MYPAGE" && (
						<MyPage
							user={this.state.user}
							getAppModeHandler={this.getAppModeHandler}></MyPage>
					)}
					{this.state.mode == "MEETING_SETTING" && (
						<MeetingSetting
							getAppModeHandler={
								this.getAppModeHandler
							}></MeetingSetting>
					)}
					{this.state.mode == "MESSENGER_LIST" && (
						<MessengerList
							socket={this.state.socket}
							user={this.state.user}
							getAppStateHandler={
								this.getAppStateHandler
							}></MessengerList>
					)}
					{this.state.mode == "MESSENGER_DETAIL" && (
						<MessengerDetail
							socket={this.state.socket}
							store={this.state}></MessengerDetail>
					)}
					{this.state.mode == "PROILE" && <ProfilePage></ProfilePage>}
					<BrowserRouter>
						{/* <Route
							exact
							path="/mypage"
							component={() => {
								fetch(
									process.env.REACT_APP_API_URL +
										"/user/" +
										utils.parseJwt(
											utils.extractCookies("token")
										)._id,
									{
										method: "GET",
										headers: {
											"Content-Type": "application/json",
											"x-access-token": utils.extractCookies(
												"token"
											)
										}
									}
								)
									.then(res => res.json())
									.then(user => {
										return (
											<MyPage user={this.props.user}>
												)}
											</MyPage>
										);
									})
									.catch(err => {
										console.error("Error:", err);
										alert("마이페이지 로딩 실패입니다..");
									});
							}}></Route> */}
						{/* <Route
							exact
							path="/meeting-page"
							component={MeetingPage}></Route>
						<Route
							exact
							path="/meeting-setting"
							component={MeetingSetting}></Route> */}

						{/* <Route exact path="/signup" component={SignupPage}></Route> */}
					</BrowserRouter>
					{/* Footer */}
					<BottomBar></BottomBar>
					{/* <Container fluid={true}>
						<Row style={{ background: "black" }} className="pt-5 pb-3">
							<Container>
								<p style={{ textAlign: "center", color: "white" }}>
									Copyright reserved by umi, 2020
								</p>
							</Container>
						</Row>
					</Container> */}
				</div>
			);
		} else {
			return (
				<Fragment>
					<AppBar></AppBar>
					<div style={{ width: "90%", height: "200px" }}></div>
					<Container>
						<h1 style={{ textAlign: "center" }}>
							PC 버전은 제공되지 않습니다.
						</h1>
						<h2 style={{ textAlign: "center", color: "gray" }}>
							죄송하지만 모바일로 접속해주시기 바랍니다.
						</h2>
					</Container>
				</Fragment>
			);
		}
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
