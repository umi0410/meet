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
	componentDidMount() {
		if (document.cookie) {
			if (utils.extractCookies("token")) {
				this.props.login(utils.parseJwt(utils.extractCookies("token")));
			}
		}
	}

	render() {
		return (
			<div>
				<AppBar user={this.props.user}></AppBar>

				{/* https://stackoverflow.com/questions/20562860/how-do-i-vertically-center-an-h1-in-a-div/20563075 */}

				{/* Navbar 때문에 자리 채우기 */}
				<div style={{ width: "90%", height: "70px" }}></div>
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
