/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount, setChatRoom } from "../store/modules/user";
import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import AnimateHeight from "react-animate-height";
import utils from "../utils";

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
import { conditionalExpression } from "@babel/types";

class MessengerDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: {},
			messages: [],
			matches: {}
		};
		this.handleAddingMessage();
		fetch(
			process.env.REACT_APP_API_URL +
				`/matches/${this.props.store.chatRoom.match._id}`,
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
				this.setState({ ...this.State, ...data }, () => {
					document.querySelector("#inputMessage").scrollIntoView();
					// this.scrollToBottom();
				});
			})
			.catch(err => {
				console.error("Error:", err);
				// alert("대화 내용을 가져오는 데에 실패했습니다.");
			});
	}

	handleInputChage = utils.handleInputChange.bind(this);
	handleCopyMessage = () => {
		let messages = this.state.messages;
		if (messages.length > 0) {
			messages.push(messages[messages.length - 1]);
			this.setState({ ...this.state, messages });
		}
	};
	sendMessage = e => {
		e.preventDefault();

		let socket = this.props.store.socket;
		socket.emit("sendMessage", {
			sender: {
				_id: this.props.store.user._id,
				email: this.props.store.user.email,
				nickname: this.props.store.user.nickname
			},
			recipient: this.props.store.chatRoom.partner,
			chatRoom: {
				_id: this.props.store.chatRoom.match._id
			},
			message: this.state.input.message
		});
		console.log("sent");
	};
	addMessage = message => {
		console.log("adding");
		let messages = [...this.state.messages];
		messages.push(message);
		this.setState({
			...this.state,
			messages: messages
		});
		this.scrollToBottom();
	};
	handleAddingMessage = e => {
		let socket = this.props.store.socket;

		socket.on("sentMessage", this.addMessage);
		socket.on("receiveMessage", this.addMessage);
	};

	scrollToBottom = e => {
		document
			.querySelector("#inputMessage")
			.scrollIntoView({ behavior: "smooth" });
	};

	loadMoreMessage = () => {
		let url = new URL(process.env.REACT_APP_API_URL + `/messages`);
		let query = {
			match: this.props.store.chatRoom.match._id,
			after: this.state.messages[0]._id
		};
		url.search = new URLSearchParams(query).toString();
		fetch(url, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": utils.extractCookies("token")
			}
		})
			.then(res => {
				// console.log(res);
				return res.json();
			})
			.then(data => {
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				this.setState({
					...this.state,
					messages: data.messages.concat(this.state.messages)
				});
			})
			.catch(err => {
				console.error("Error:", err);
				console.log(err);
				// alert("상대방의 리스트를 가져오는 데에 실패했습니다.");
			});
	};
	render() {
		return (
			<React.Fragment>
				{/* <h1>{this.props.store.chatRoom.partner.nickname}</h1> */}
				<div style={{ background: "#f8f8f8" }}>
					{/* 주고 받은 메시지 */}
					<Container fluid={true}>
						<Row className="justify-content-center pt-2">
							<img
								style={{ width: "30px" }}
								src="/up.png"
								onClick={this.loadMoreMessage}></img>
						</Row>
						{this.state.messages.map(message => {
							//내 꺼
							if (
								message.sender.nickname ==
								this.props.store.user.nickname
							) {
								return (
									<MessageBoxMe
										key={message._id}
										message={message}></MessageBoxMe>
								);
							} else {
								return (
									<MessageBoxPartner
										key={message._id}
										message={message}></MessageBoxPartner>
								);
							}
						})}
					</Container>
					{/* form */}
					<Container fluid={true}>
						<Form>
							<Container fluid={true}>
								<FormGroup
									row
									className="justify-content-center">
									<Col xs="9" className="p-0">
										<Input
											type="textarea"
											name="message"
											id="inputMessage"
											rows="1"
											onChange={this.handleInputChage(
												"message"
											)}
											style={{
												borderRadius: "8px 0px 0px 8px"
											}}
										/>
									</Col>
									<Col xs="3" className="p-0">
										<Button
											block
											onClick={this.sendMessage}
											style={{
												paddingLeft: "2px",
												paddingRight: "2px",
												borderRadius: "0px 8px 8px 0px"
											}}>
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

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default MessengerDetail;
