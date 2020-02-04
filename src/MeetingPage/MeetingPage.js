/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "../store/modules/user";
import { setMeetingPartner, setNoMeeting } from "../store/modules/meeting";
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
import ProfileComponent from "../Profile/ProfileComponent";
import MeetingNoMeeting from "./MeetingNoMeeting";
class MeetingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getMatch = () => {
		fetch(process.env.REACT_APP_API_URL + `/meetings`, {
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
				//지금은 임의로 MeetingNoMeeing 제공
				// this.props.setNoMeeting();
				if (data.status === "newMeeting") {
					this.props.setMeetingPartner(data.partner);
				}
			})
			.catch(err => {
				console.error("Error:", err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	};
	componentDidMount() {
		this.getMatch();
	}
	handleLike = () => {
		fetch(
			process.env.REACT_APP_API_URL +
				`/meetings?action=like&id=${this.props.meeting.partner._id}`,
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": utils.extractCookies("token")
				}
			}
		)
			.then(res => res.json())
			.then(data => {
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				// console.log(data);
				//데이터에 match 정보가 있다는 것은 match가 성사되었다는 것.
				console.log(data);
				if (data.match) {
					alert(
						data.match.participants[0].nickname +
							"님과 " +
							data.match.participants[1].nickname +
							"님이 연결되셨습니다.\n적극적으로먼저연락해보세요!"
					);
				}
				this.getMatch();
			})
			.catch(err => {
				console.error("Error:", err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	};
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		return (
			<React.Fragment>
				{/* Main introducing */}

				{this.props.meeting.partner._id ? (
					<React.Fragment>
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

						{/* 임시로 NoMeeting Component 불러오기 */}
						<Container
							fluid={true}
							style={{
								position: "fixed",
								bottom: "0",
								zIndex: "999"
							}}>
							<Row className="justify-content-center">
								<Col xs="10">
									<Button
										block
										onClick={() => {
											this.props.setNoMeeting();
										}}>
										Dev-No Meeting
									</Button>
								</Col>
							</Row>
						</Container>
						<ProfileComponent
							user={
								this.props.meeting.partner
							}></ProfileComponent>
					</React.Fragment>
				) : (
					<MeetingNoMeeting></MeetingNoMeeting>
				)}
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
	setMeetingPartner: partner => dispatch(setMeetingPartner(partner)),
	setNoMeeting: () => dispatch(setNoMeeting())
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
