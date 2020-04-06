/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "../store/modules/user";
import { setMeetingPartner } from "../store/modules/meeting";
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
	Fade,
	Spinner
} from "reactstrap";
import FadeIn from "react-fade-in";
import ProfileComponent from "../Profile/ProfileComponent";
import MeetingNoMeeting from "./MeetingNoMeeting";
class MeetingPage extends Component {
	constructor(props) {
		super(props);
		//loading, completed
		this.state = { status: "loading" };
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
				if (data.status === "success") {
					this.props.setMeetingPartner(data.partner);
					this.setState({ ...this.state, status: "completed" });
				} else if (data.status == "noCandidate") {
					this.setState({ ...this.state, status: "completed" })
				}
			})
			.catch(err => {
				console.error("Error:", err);
				console.error("매치를 가져오는 데에 실패했습니다.");
				this.setState({ ...this.state, status: "noCandidate" });
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
				alert("상대방에게 좋아요를 보내는 데에 실패하였습니다.");
			});
	};
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		if (this.state.status == "loading") {
			return (
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
			);
		} else if (this.state.status == "completed") {
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
									bottom: "80px",
									zIndex: "999"
								}}>
								<Row
									className="justify-content-center"
									style={{}}>
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
		} else if (this.state.status == "noCandidate") {
			return <MeetingNoMeeting></MeetingNoMeeting>;
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
	getAccount: () => dispatch(getAccount()),
	setMeetingPartner: partner => dispatch(setMeetingPartner(partner))
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
