/* eslint-disable*/
import React, { useState, Component } from "react";

import { connect } from "react-redux";
import { login, getAccount, setChatRoom } from "../store/modules/user";
import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";

import utils from "../utils";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import MessengerDetail from "./MessengerDetail";
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
class MessengerList extends Component {
	constructor(props) {
		super(props);
		this.state = { matches: [] };
		console.log("componentDidMount");
		fetch(process.env.REACT_APP_API_URL + `/matches`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": utils.extractCookies("token")
			}
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				this.setState({ ...this.state, matches: data });
			})
			.catch(err => {
				console.error("Error:", err);
				console.log(err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	}
	render() {
		//만약 chatRoom 정보가 있다면 MessengerDetail
		if (this.props.user.chatRoom) {
			console.log("chatroom");
			return <MessengerDetail></MessengerDetail>;
		}
		return (
			<React.Fragment>
				<Container fluid={true} style={{ minHeight: "80vw" }}>
					{this.state.matches.map((match, index) => {
						//만약 participants[0] 이 내 nickname과 같ㅇ면 [1]이 상대,
						//다르면 [0]이 상대
						let partner =
							this.props.user.nickname ==
							match.participants[0].nickname
								? match.participants[1]
								: match.participants[0];
						return (
							<Row
								key={index}
								style={{
									background: "#white",
									borderBottom: "1px solid gray"
								}}
								className="mt-2">
								<Col xs="2" className="pr-0">
									<img
										src="/profile.png"
										style={{ width: "100%" }}
										onClick={() => {
											window.location.href = `/profile/${partner._id}`;
										}}></img>
								</Col>
								<Col
									xs="10"
									onClick={() => {
										// console.log(this.props.socket);
										this.props.setChatRoom({
											match: match,
											partner: partner,
											socket: this.props.socket
										});
									}}>
									<p className="mb-1">
										<span style={{ fontWeight: "bold" }}>
											{partner.nickname}
										</span>
										<span
											style={{
												fontSize: "0.8rem",
												color: "gray"
											}}>
											{partner.university}
										</span>
									</p>
									<p style={{ fontSize: "0.8rem" }}>
										{partner.profileMessage}
									</p>
								</Col>
							</Row>
						);
					})}
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
export default connect(mapStateToProps, mapDispatchToProps)(MessengerList);
