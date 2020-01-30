/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount, setChatRoom } from "../store/modules/user";
import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import utils from "../utils";
import settings from "../settings";
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
	Form,
	FormGroup,
	Input
} from "reactstrap";
import MessageBoxMe from "./MessageBoxMe";
import MessageBoxPartner from "./MessageBoxPartner";

class MessengerDetail extends Component {
	state = { input: {}, messages: [], matches: {} };

	handleInputChage = utils.handleInputChange.bind(this);
	sendMessage = e => {
		e.preventDefault();
		let socket = this.props.user.socket;
		socket.emit("sendMessage", {
			sender: {
				_id: this.props.user._id,
				email: this.props.user.email,
				nickname: this.props.user.nickname
			},
			recipient: this.props.user.partner,
			chatRoom: {
				_id: this.props.user.chatRoom._id
			},
			message: this.state.input.message
		});
	};

	componentDidMount() {
		fetch(settings.apiServer + `/matches/${this.props.user.chatRoom._id}`, {
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
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				// console.log(data);
				this.setState({ ...this.State, ...data });
				console.log(this.state);
			})
			.catch(err => {
				console.error("Error:", err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	}
	render() {
		return (
			<React.Fragment>
				<h1>{this.props.user.partner.nickname}</h1>
				<div style={{ background: "#f8f8f8" }}>
					{/* 주고 받은 메시지 */}
					<Container fluid={true}>
						{/* 상대방 */}
						{console.log(this.state.messages)}
						{this.state.messages.map(message => {
							//내 꺼
							if (
								message.sender.nickname ==
								this.props.user.nickname
							) {
								return (
									<MessageBoxMe
										message={message}></MessageBoxMe>
								);
							} else {
								return (
									<MessageBoxPartner
										message={message}></MessageBoxPartner>
								);
							}
						})}
					</Container>

					<Container fluid={true}>
						<Form>
							<Container fluid={true}>
								<FormGroup row class="justify-content-center">
									<Col xs="9" className="pl-0">
										<Input
											type="textarea"
											name="message"
											id="inputMessage"
											rows="1"
											onChange={this.handleInputChage(
												"message"
											)}
										/>
									</Col>
									<Col xs="2" className="pr-0">
										<Button
											block
											onClick={this.sendMessage}>
											Send
										</Button>
									</Col>
								</FormGroup>
							</Container>
							{/* 나중에 쓰셈. 인풋에 포커스 잡기. */}
							{/* <script>{function test(){
							alert("hello")
							document.querySelector("#inputMessage").scrollIntoView(false)}
							test();
							}
						</script> */}
						</Form>
					</Container>
				</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MessengerDetail);
