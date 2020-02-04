/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "./store/modules/user";
import { setMeetingPartner } from "./store/modules/meeting";
import logo from "./logo.svg";

import utils from "./utils";
import "./App.css";
import "./fonts.css";
import "./fade.css";
import "./MeetingPage/Meeting.css";
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
class ProfileComponent extends Component {
	constructor(props) {
		super(props);
		// 아래 state는 props가 된다.
		// this.state = { partner: { likes: [], hates: [], questions: [] } };
	}
	componentDidMount() {}

	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		return (
			<React.Fragment>
				{/* Main introducing */}

				{/* fixed picker */}
				<Container
					fluid={true}
					style={{
						position: "fixed",
						bottom: "20px",
						zIndex: "999"
					}}>
					<Row className="justify-content-center" style={{}}>
						<Col>
							<Button
								style={{ opacity: "0.6" }}
								className="float-right">
								Hate
							</Button>
						</Col>
						<Col>
							<Button
								style={{ opacity: "0.6" }}
								onClick={this.handleLike}>
								Like
							</Button>
						</Col>
					</Row>
				</Container>
				{/* profile starts */}
				<Container fluid={true} className="mt-2">
					<Badge color="warning" className="mr-1">
						# 공대남
					</Badge>
					<Badge color="secondary" className="mr-1">
						# V.I.P
					</Badge>
					<Row className="clearfix">
						<Col className="" size={1}>
							<span
								style={{
									fontWeight: "bold",
									fontSize: "1.2rem"
								}}>
								{this.props.meeting.partner.nickname}
							</span>
							, 24
							<br></br>
							<p>
								<span>
									{this.props.meeting.partner.university}{" "}
								</span>
								<span style={{ color: "gray" }}>
									컴퓨터 공학과
								</span>
								<br />
								<span>176 / 78</span>
							</p>
						</Col>
						<img
							className="float-right"
							src="/khu.jpg"
							style={{ width: "25vw", opacity: "0.5" }}></img>
					</Row>
				</Container>
				<Container fluid={true} id="meetingContainer">
					{/* profile message */}
					<Row style={{ background: "#f8f8f8" }} className="pt-2">
						<Col xs="1" className="m-1 p-0">
							<img
								src="/quotes_0.png"
								style={{ width: "100%" }}></img>
						</Col>
						<Col size="10" className="mt-2">
							<p>{this.props.meeting.partner.profileMessage}</p>
						</Col>
						<Col xs="1" className="m-1 p-0">
							<img
								src="/quotes_1.png"
								style={{ width: "100%" }}></img>
						</Col>
					</Row>

					{/* Likes */}
					<div className="mt-4 mb-4" style={{}}>
						<Row>
							<Col>
								<h5
									style={{
										fontFamily: "Amarillo",
										color: likesColor
									}}>
									likes
								</h5>
							</Col>
						</Row>
						{/* likes-hashtags */}
						<Row>
							<Col>
								<h4>
									{this.props.meeting.partner.likes.map(
										(like, index) => {
											return (
												<Badge
													className="like-outline mr-1"
													key={index}>
													{like}
												</Badge>
											);
										}
									)}
								</h4>
							</Col>
						</Row>
					</div>

					{/* hates */}
					<div className="mb-4" style={{}}>
						<Row>
							<Col>
								<h5
									style={{
										fontFamily: "Amarillo",
										color: hatesColor
									}}>
									hates
								</h5>
							</Col>
						</Row>

						{/* hates-hashtags */}
						<Row>
							<Col>
								<h4>
									{this.props.meeting.partner.hates.map(
										(hate, index) => {
											return (
												<Badge
													className="hate-outline mr-1"
													key={index}>
													{hate}
												</Badge>
											);
										}
									)}
								</h4>
							</Col>
						</Row>
					</div>
					{/* cardview 시작 */}
					<div
						style={{
							background: "#f8f8f8",
							width: "100vw",
							paddingLeft: "0px",
							paddingRight: "0px",
							marginLeft: "-15px"
							// marginRight: "0px;"
						}}
						className="pt-3 pb-3">
						{/* Row가 한 Card */}
						{this.props.meeting.partner.questions.map(
							(question, index) => (
								<Row
									className="pt-2 pb-2 mr-0 ml-0"
									key={index}>
									<Col
										xs="10"
										className="m-auto"
										style={{
											borderRadius: "8px",
											background: "white",
											boxShadow:
												"0px 0px 23px 1px lightgray"
										}}>
										<p
											style={{
												borderBottom:
													"1px solid lightgray"
											}}>
											{question.title}
										</p>
										<p>- {question.answer}</p>
									</Col>
								</Row>
							)
						)}
					</div>
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
const mapDispatchToProps = dispatch => ({
	login: account => dispatch(login(account)),
	getAccount: () => dispatch(getAccount()),
	setChatRoom: chatRoom => dispatch(setChatRoom(chatRoom)),
	setMeetingPartner: partner => dispatch(setMeetingPartner(partner))
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
