/* eslint-disable*/
import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import AnimateHeight from "react-animate-height";
import {
	Container,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from "reactstrap";
class RegisterPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			universities: [],
			emailInput: "",
			majorInputHeight: 0,
			campusInputHeight: 0,
			input: {
				university: {}
			}
		};
	}
	componentDidMount() {
		fetch(process.env.REACT_APP_API_URL + `/universities`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				this.setState({ ...this.state, universities: data });
			})
			.catch(err => {
				alert("현재 대학교 인증 관련 시스템이 원활하지 않습니다.");
				window.location.href = "/";
			});
	}
	handleEmailChange = e => {
		let emailValue = e.target.value;
		//대충 7자리는 넘을 때에만 이메일 validation 체크
		if (emailValue.length > 7) {
			let univ = this.state.universities.find(univ => {
				//univ에서 해당하는 univ를 찾은 경우
				if (emailValue.indexOf(univ.domain) != -1) {
					return true;
				}
			});
			//발견한 경우
			if (univ != undefined) {
				if (this.state.majorInputHeight == 0) {
					if ("campuses" in univ) {
						this.setState(
							{
								...this.state,
								input: {
									...this.state.input,
									university: univ,
									major: univ.majors[0],
									campus: univ.campuses[0]
								}
							},
							this.toggleMajorAndCampusInput
						);
					} else {
						this.setState(
							{
								...this.state,
								input: {
									...this.state.input,
									university: univ,
									major: univ.majors[0]
								}
							},
							this.toggleMajorInput
						);
					}
				}
			}
			//발견 못한 경우
			else {
				//원래 발견상태였다면 height!=0
				if (this.state.majorInputHeight != 0) {
					console.log("campuses" in this.state.input.university);
					console.log(this.state.input.university);
					//campus가 존재한 경우
					if (this.state.campusInputHeight != 0) {
						this.setState(
							{
								...this.state,
								input: {
									...this.state.input,
									campus: undefined,
									major: undefined,
									university: {}
								}
							},
							this.toggleMajorAndCampusInput
						);
					} else {
						//campus가 존재하지 않은 경우
						this.setState(
							{
								...this.state,
								input: {
									...this.state.input,
									campus: undefined,
									major: undefined,
									university: {}
								}
							},
							this.toggleMajorInput
						);
					}
				}
			}
		}
	};
	toggleMajorInput = () => {
		console.log("only major");
		this.setState({
			...this.state,
			majorInputHeight: this.state.majorInputHeight === 0 ? "auto" : 0
		});
	};
	toggleMajorAndCampusInput = () => {
		// console.log(this.state.majorInputHeight);
		console.log("both");
		this.setState({
			...this.state,
			majorInputHeight: this.state.majorInputHeight === 0 ? "auto" : 0,
			campusInputHeight: this.state.campusInputHeight === 0 ? "auto" : 0
		});
	};
	getInputChageHandler = field => {
		return e => {
			let input = { ...this.state.input };
			input[field] = e.target.value;

			this.setState({
				...this.state,
				input
			});
			console.log(this.state);
		};
	};
	handleSubmit = e => {
		e.preventDefault();
		fetch(process.env.REACT_APP_API_URL + "/users/register", {
			method: "POST",
			body: JSON.stringify(this.state.input),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				// alert(data.token);
				document.cookie =
					"token=" +
					data.token +
					";  expires=Fri, 31 Dec 9999 23:59:59 GMT";
				//그냥 location을 바꿔버림으로써 App의 constructor 소환해버리기=> 가능
				//token을 cookie에 집어넣었으니, 따로 로그인 안해도 App.js에서 token으로 자동 로그인
				window.location.href = "/";
			})
			.catch(err => {
				console.error("Error:", err);
				alert("회원가입에 실패하였습니다.");
			});
	};
	render() {
		return (
			<Container>
				<Row
					className="mb-4 justify-content-center"
					style={{
						backgroundImage: "url(/seojun.jpg)"
					}}>
					<div
						style={{
							width: "100%",
							height: "100%",

							color: "white",
							background:
								"linear-gradient(to left, rgba(255,0,0,0), rgba(0,0,0,2))"
						}}>
						<Col className=" pt-5">
							<h5>대학생들의 진솔한 만남.</h5>
							<p style={{ textAlign: "right" }}>Jinting.</p>
						</Col>
					</div>
				</Row>
				<Form
					action={process.env.REACT_APP_API_URL + "/users/register"}
					method="post"
					id="registerForm">
					<FormGroup>
						<Label for="exampleEmail">
							학교 이메일
							<span
								className="ml-2"
								style={{
									fontSize: "0.8rem"
								}}>
								지원 학교-
							</span>
							{this.state.universities.map((university, i) => {
								return (
									<span
										key={i}
										style={{
											fontSize: "0.7rem",
											color: "gray"
										}}>
										{university.universityName}
										{this.state.universities.length !=
											i + 1 && ","}
									</span>
								);
							})}
						</Label>
						<Input
							type="email"
							name="email"
							id="exampleEmail"
							onChange={this.handleEmailChange}
							placeholder="학교 이메일로만 가입이 가능합니다."
						/>
					</FormGroup>
					<FormGroup>
						<AnimateHeight
							duration={500}
							height={this.state.majorInputHeight} // see props documentation below
						>
							<Input
								type="select"
								name="major"
								id="majorInput"
								onChange={this.getInputChageHandler("major")}>
								{this.state.input.university.majors &&
									this.state.input.university.majors.map(
										(major, i) => {
											return (
												<option key={i}>{major}</option>
											);
										}
									)}
							</Input>
						</AnimateHeight>
						<AnimateHeight
							duration={500}
							height={this.state.campusInputHeight} // see props documentation below
						>
							<Input
								type="select"
								name="campus"
								id="campusInput"
								onChange={this.getInputChageHandler("campus")}>
								{this.state.input.university.campuses &&
									this.state.input.university.campuses.map(
										(campus, i) => {
											return (
												<option key={i}>
													{campus}
												</option>
											);
										}
									)}
							</Input>
						</AnimateHeight>
					</FormGroup>
					<FormGroup>
						<Label for="nicknameInput">닉네임</Label>
						<Input
							type="text"
							name="nickname"
							id="nicknameInput"
							onChange={this.getInputChageHandler("nickname")}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input
							type="password"
							name="password"
							id="passwordInput"
							placeholder="복잡한 비밀번호를 입력해주세요."
							onChange={this.getInputChageHandler("password")}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password Confirm</Label>
						<Input
							type="password"
							name="passwordConfirm"
							id="passwordConfirmInput"
							placeholder="동일한 비밀번호를 입력해주세요."
							onChange={this.getInputChageHandler(
								"passwordConfirm"
							)}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelect">Birth year</Label>
						<Input
							type="select"
							name="birthYear"
							id="birthYearInput"
							onChange={this.getInputChageHandler("birthYear")}>
							{Array.from({ length: 15 }, (x, i) => i).map(
								index => {
									return (
										<option key={index}>
											{index + 1990}
										</option>
									);
								}
							)}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelectMulti">키 (cm)</Label>
						<Input
							type="number"
							name="height"
							id="heightInput"
							placeholder="아래에서 비밀로 설정 가능"
							onChange={this.getInputChageHandler(
								"height"
							)}></Input>
					</FormGroup>

					<FormGroup>
						<Label for="exampleSelectMulti">몸무게 (kg)</Label>
						<Input
							type="number"
							name="weight"
							id="weightInput"
							placeholder="아래에서 비밀로 설정 가능"
							onChange={this.getInputChageHandler(
								"weight"
							)}></Input>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								type="checkbox"
								name="isPrivateHeightAndWeight"
								onChange={this.getInputChageHandler(
									"birthYear"
								)}
							/>{" "}
							키와 몸무개 공개하기
						</Label>
						<FormText color="muted">
							내 키와 몸무게를 비공개할 경우 상대방의 키와
							몸무게도 볼 수 없습니다.
						</FormText>
					</FormGroup>
					<FormGroup>
						<Label for="exampleText">소개메시지</Label>
						<Input
							type="textarea"
							name="profileMessage"
							id="profileMessageInput"
							onChange={this.getInputChageHandler(
								"profileMessage"
							)}
							placeholder="상대방에게 보여질 소개메시지입니다. 정성껏 작성해주실 수록 좋아요!"
						/>
					</FormGroup>

					<Button block onClick={this.handleSubmit}>
						회원가입
					</Button>
				</Form>
			</Container>
		);
	}
}
export default RegisterPage;
