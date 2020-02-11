/* eslint-disable*/

import React, { useState, Component } from "react";
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
import utils from "./utils";

import MainPage from "./MainPage";
import AppBar from "./AppBar";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyPage from "./MyPage";
import MessengerDetail from "./Messenger/MessengerDetail";
import MessengerList from "./Messenger/MessengerList";
import MeetingPage from "./MeetingPage/MeetingPage";
import MeetingSetting from "./MeetingSetting/MeetingSetting";
import ProfilePage from "./Profile/ProfilePage";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { isScreenVisible: true };
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
		let tokenDecoded;
		//cookie가 있는지 매번 확인하고, 로그인 정보를 redux store에 넣고, socket 연결
		if (document.cookie) {
			if (utils.extractCookies("token")) {
				//componentDidMount에서는 redux를 통한 props를 이용할 수 없는듯.
				//그래서 직접 jwt 이용함...
				tokenDecoded = utils.parseJwt(utils.extractCookies("token"));
				this.props.login(tokenDecoded);
				console.log(tokenDecoded);
				//socket 생성할 때 나의 login 정보도 넘겨줌. 그걸 이용해 나에게만 연락할 때 이걸 이용.
				let socket = io.connect(process.env.REACT_APP_API_URL, {
					//
					query: "id=" + tokenDecoded._id
				});
				//socket을 state에 담아봄
				this.setState({ ...this.state, socket });

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
							Notification.requestPermission(function(result) {
								if (result === "granted") {
									console.log("granted");
									navigator.serviceWorker.register(
										"/custom-service-worker.js"
									);
									navigator.serviceWorker.ready.then(function(
										registration
									) {
										console.log("reday");
										registration.showNotification(
											`${data.sender.nickname +
												"sent a message"}`,
											{
												body: data.data,
												icon:
													"https://img.icons8.com/cotton/2x/like.png",
												// vibrate: [
												// 	200,
												// 	100,
												// 	200,
												// 	100,
												// 	200,
												// 	100,
												// 	200
												// ],
												tag: "vibration-sample"
											}
										);
									});
								}
							});

							//navigator.serviceWorker.ready 이후 showNotification은 원래 기본적인 service worker
							//Notification은 Firebase 의 service worker.
							// new Notification(
							// 	data.sender.nickname + "으로 부터 메시지",
							// 	{
							// 		body: data.data,
							// 		//이미지 어떻게 넣냐..
							// 		imageUrl:
							// 			"https://previews.123rf.com/images/avectors/avectors1803/avectors180300188/98093154-heart-logo-vector-icon-isolated-modern-abstract-line-black-heart-symbol-.jpg",
							// 		icon:
							// 			"https://previews.123rf.com/images/avectors/avectors1803/avectors180300188/98093154-heart-logo-vector-icon-isolated-modern-abstract-line-black-heart-symbol-.jpg",
							// 		image:
							// 			"https://previews.123rf.com/images/avectors/avectors1803/avectors180300188/98093154-heart-logo-vector-icon-isolated-modern-abstract-line-black-heart-symbol-.jpg"
							// 	}
							// );
						}
					}
				});
			}
		}
		// setInterval(() => {
		// 	console.log(this.state.isScreenVisible);
		// }, 1000);
		//   socket.on('chat message', function(msg){
		//     $('#messages').append($('<li>').text(msg));
		//   });
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
	render() {
		return (
			<div>
				<AppBar user={this.props.user}></AppBar>

				{/* https://stackoverflow.com/questions/20562860/how-do-i-vertically-center-an-h1-in-a-div/20563075 */}

				{/* Navbar 때문에 자리 채우기 */}
				<div style={{ width: "90%", height: "70px" }}></div>
				{/* Google Adsense */}
				{/* <AdSense.Google
					client="ca-pub-7292810486004926"
					slot="7806394673"
				/> */}
				<h1>{"" + this.state.isScreenVisible}</h1>
				<BrowserRouter>
					<Route
						exact
						path="/"
						component={
							this.props.user.email ? MeetingPage : MainPage
						}></Route>
					<Route exact path="/login" component={LoginPage}></Route>
					<Route
						exact
						path="/register"
						component={RegisterPage}></Route>
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
						component={() => {
							return (
								<MessengerList socket={this.state.socket}>
									)}
								</MessengerList>
							);
						}}></Route>
					<Route
						path="/profile/:userIdToRead"
						component={ProfilePage}></Route>
					{/* ></Route> */}
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
