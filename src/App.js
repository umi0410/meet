/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "./store/modules/user";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
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

class App extends Component {
	state = {};
	componentDidMount() {
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
				socket.on("receiveMessage", function(data) {
					// console.log(data);
					console.log(
						`${data.sender.nickname}으로 부터 메시지 도착\n>  ${data.data}`
					);
				});
			}
		}

		//   socket.on('chat message', function(msg){
		//     $('#messages').append($('<li>').text(msg));
		//   });
	}

	render() {
		return (
			<div>
				<AppBar user={this.props.user}></AppBar>

				{/* https://stackoverflow.com/questions/20562860/how-do-i-vertically-center-an-h1-in-a-div/20563075 */}

				{/* Navbar 때문에 자리 채우기 */}
				<div style={{ width: "90%", height: "70px" }}></div>
				<AdSense.Google
					client="ca-pub-7292810486004926"
					slot="7806394673"
				/>
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
						component={MessengerList}
						component={() => (
							<MessengerList
								socket={this.state.socket}></MessengerList>
						)}></Route>
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
