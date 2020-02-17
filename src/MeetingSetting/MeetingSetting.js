/* eslint-disable*/

import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount, setChatRoom } from "../store/modules/user";

import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";
import "../MeetingPage/Meeting.css";
import utils from "../utils";
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
	Form,
	FormGroup,
	Label,
	FormText,
	Input
} from "reactstrap";
import { truncate } from "fs";
class MeetingSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileMessage: "",
			tags: [],
			questions: []
		};
	}

	componentDidMount() {
		this.loadTags();
		this.loadQuestions();
		fetch(
			process.env.REACT_APP_API_URL +
				`/users/${utils.parseJwt(utils.extractCookies("token"))._id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": utils.extractCookies("token")
				}
			}
		)
			.then(res => {
				// console.log(res.body);
				return res.json();
			})
			.then(data => {
				let partner = data.user;
				if (data.status == "success") {
					//전체 tag와 나의 tag 비교
					let tags = this.state.tags;
					for (let tag of tags) {
						//myTag는 그냥 태그임
						let isLiked = partner.likes.find(myTag => {
							if (myTag == tag.tag) {
								//얕은 복사라 가능할듯.
								// console.log("liked", tag.tag);
								return true;
							}
						});
						if (isLiked) tag.status = 1;
						let isHated = partner.hates.find(myTag => {
							if (myTag == tag.tag) {
								//얕은 복사라 가능할듯.
								return true;
							}
						});
						if (isHated) tag.status = 2;
					}

					// 전체 questions와 user가 답변한 questions 비교
					let questions = this.state.questions;
					for (let question of questions) {
						let isAnswered = partner.questions.forEach(
							(myQuestion, i) => {
								if (myQuestion.title == question.title) {
									question.answer = myQuestion.answer;
								}
							}
						);
					}

					//나의 questions 와 tags 를 적용시킨 값을 state에 반영
					this.setState({ ...this.state, tags, questions });
				} else alert(data.status);
			})
			.catch(err => {
				console.error("Error:", err);
				alert("태그 로딩 실패");
			});
	}
	loadTags = () => {
		fetch(process.env.REACT_APP_API_URL + "/tags", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				// console.log(res.body);
				return res.json();
			})
			.then(data => {
				// console.log(data);
				let tags = [];
				for (let tag of data) {
					tags.push(this.tagConstructor(tag));
				}
				this.setState({ ...this.state, tags });
			})
			.catch(err => {
				console.error("Error:", err);
				alert("태그 로딩 실패");
			});
	};
	loadQuestions = () => {
		fetch(process.env.REACT_APP_API_URL + "/questions", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				// console.log(res.body);
				return res.json();
			})
			.then(data => {
				// console.log(data);
				let questions = [];
				for (let question of data) {
					questions.push(
						this.questionConstructor(
							question.title,
							question.isTextArea
						)
					);
				}
				this.setState({ ...this.state, questions });
			})
			.catch(err => {
				console.error("Error:", err);
				alert("설문지 로딩 실패");
			});
	};
	//status는 0 notSelected, 1 liked, 2 hated
	tagConstructor = tag => {
		return {
			tag,
			status: 0
		};
	};
	questionConstructor = (title, isTextArea) => {
		return { title, answer: "", isTextArea };
	};

	handleProfileMessage = e => {
		this.setState({ ...this.state, profileMessage: e.target.value });
		// console.log(this.state);
	};
	//index를 적용시킨 핸들러 리턴, like인지 hate인지 전달
	handleToggleState = index => {
		return e => {
			//toggle, 0 notSelected, 1 liked, 2 hated
			let tags = this.state.tags;
			tags[index].status = (tags[index].status + 1) % 3;
			this.setState({ ...this.state, tags });
		};
	};
	handleInputAnswer = index => {
		return e => {
			//toggle, 0 notSelected, 1 liked, 2 hated
			let questions = this.state.questions;
			questions[index].answer = e.target.value;
			// console.log(questions[index]);
			this.setState({ ...this.state, questions });
		};
	};

	handleSubmit = e => {
		fetch(
			process.env.REACT_APP_API_URL +
				`/users/${utils.parseJwt(utils.extractCookies("token"))._id}`,
			{
				method: "PUT",
				body: JSON.stringify(this.state),
				headers: {
					"Content-Type": "application/json",
					"x-access-token": utils.extractCookies("token")
				}
			}
		)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.props.getAppModeHandler("MYPAGE")();
			})
			.catch(err => {
				console.error("Error:", err);
				alert("소개팅 정보 제출에서 오류 발생.");
			});
	};
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		return (
			<React.Fragment>
				<div style={{ background: "#f5f5f5" }}>
					<Container className="pt-3">
						<p>
							# 만남을 진행하기 위해선 "likes", "hates"를 6개
							이상, 문답을 2개 이상 작성해주세요.
						</p>
					</Container>
				</div>
				<Container fluid={true} className="mt-3">
					<Form>
						<Row
							style={{
								position: "fixed",
								width: "100%",
								bottom: "80px",
								opacity: "70%",
								zIndex: "999"
							}}
							className="justify-content-center">
							<Col xs="8">
								<Button block onClick={this.handleSubmit}>
									수정하기
								</Button>
							</Col>
						</Row>
						<FormGroup>
							<Label for="exampleEmail">프로필 메시지</Label>
							{/* <span
								style={{ fontSize: "0.8rem" }}
								className="float-right text-muted">
								{this.props.user.nickname}
							</span> */}
							<Input
								onChange={this.handleProfileMessage}
								type="textarea"
								rows="4"
								placeholder="프로필 메시지를 잘 적어주실 수록 소중한 만남으로 이어질 확률이 높습니다."
							/>
							{/* <FormText>최소한 5글자는 적어주세요!</FormText> */}
						</FormGroup>

						{/* 나중에 Json으로 정보 넘길 떄 사용 */}
						<Input hidden></Input>
						{/* 나중에 쓰셈. 인풋에 포커스 잡기. */}
						{/* <script>{function test(){
							alert("hello")
							document.querySelector("#inputMessage").scrollIntoView(false)}
							test();
							}
						</script> */}
					</Form>
				</Container>
				<div>
					<Container fluid={true}>
						<Row>
							<Col>
								<h5
									style={{
										fontFamily: "Amarillo"
									}}>
									<span style={{ color: likesColor }}>
										likes
									</span>
									<span style={{ color: "lightgray" }}>
										{"&"}
									</span>
									<span style={{ color: hatesColor }}>
										hates
									</span>
								</h5>
							</Col>
						</Row>

						{/* hashtags */}
						<Row>
							<Col>
								<h4>
									{this.state.tags.map((tag, index) => {
										let status;
										switch (tag.status) {
											case 0:
												status = "not-selected";
												break;
											case 1:
												status = "liked";
												break;
												break;
											case 2:
												status = "hated";
												break;
										}
										return (
											<Badge
												key={index}
												onClick={this.handleToggleState(
													index
												)}
												className={"mr-1 " + status}>
												{tag.tag}
											</Badge>
										);
									})}
								</h4>
							</Col>
						</Row>
					</Container>
					<Container fluid={true} className="mt-3">
						<p className="mb-1">만남 설문지</p>
						<p
							className="ml-2"
							style={{ fontSize: "0.8rem", color: "gray" }}>
							상대방에게 당신에 대해 어필하고, 추구하는 만남을
							설명해주세요.
						</p>

						<Form>
							<FormGroup>
								{this.state.questions.map((question, index) => {
									return (
										<React.Fragment key={index}>
											<Label>{question.title}</Label>
											<Input
												type={
													question.isTextArea
														? "textarea"
														: "text"
												}
												onChange={this.handleInputAnswer(
													index
												)}
												value={question.answer}
											/>
										</React.Fragment>
									);
								})}
							</FormGroup>
							{/* 나중에 Json으로 정보 넘길 떄 사용 */}
							<Input hidden></Input>
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
	setChatRoom: chatRoom => dispatch(setChatRoom(chatRoom)),
	setMeetingPartner: partner => dispatch(setMeetingPartner(partner))
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(MeetingSetting);
