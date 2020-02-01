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
			universities: {},
			emailInput: "",
			majorInputHeight: 0,
			university: {}
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
				console.error("Error:", err);
				console.log("대학목록 로딩 실패");
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
				// alert(univ.universityName)
				if (this.state.majorInputHeight == 0) {
					this.setState(
						{ ...this.state, university: univ },
						this.toggleMajorInput
					);
				}
			}
			//발견 못한 경우
			else {
				//원래 발견상태였다면 height!=0
				if (this.state.majorInputHeight != 0) {
					console.log("escaped");
					this.setState({ ...this.state, university: {} });
					this.toggleMajorInput();
				}
			}
		}
	};
	toggleMajorInput = () => {
		this.setState({
			...this.state,
			majorInputHeight: this.state.majorInputHeight === 0 ? "auto" : 0
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
						<Label for="exampleEmail">학교 이메일</Label>
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
							<Input type="select" name="major" id="majorInput">
								{this.state.university.majors &&
									this.state.university.majors.map(
										(major, i) => {
											return (
												<option key={i}>{major}</option>
											);
										}
									)}
							</Input>
						</AnimateHeight>
					</FormGroup>
					<FormGroup>
						<Label for="nicknameInput">닉네임</Label>
						<Input type="text" name="nickname" id="nicknameInput" />
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input
							type="password"
							name="password"
							id="passwordInput"
							placeholder="복잡한 비밀번호를 입력해주세요."
						/>
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password Confirm</Label>
						<Input
							type="password"
							name="passwordConfirm"
							id="passwordConfirmInput"
							placeholder="동일한 비밀번호를 입력해주세요."
						/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelect">Birth year</Label>
						<Input type="select" name="select" id="exampleSelect">
							{Array.from({ length: 15 }, (x, i) => i).map(
								index => {
									return <option>{index + 1990}</option>;
								}
							)}
						</Input>
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelectMulti">키 (cm)</Label>
						<Input
							type="number"
							name="selectMulti"
							id="exampleSelectMulti"
							placeholder="아래에서 비밀로 설정 가능"></Input>
					</FormGroup>

					<FormGroup>
						<Label for="exampleSelectMulti">몸무게 (kg)</Label>
						<Input
							type="number"
							name="selectMulti"
							id="exampleSelectMulti"
							placeholder="아래에서 비밀로 설정 가능"></Input>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="checkbox" /> 키와 몸무개 공개하기
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
							name="text"
							id="exampleText"
							placeholder="상대방에게 보여질 소개메시지입니다. 정성껏 작성해주실 수록 좋아요!"
						/>
					</FormGroup>

					<Button
						block
						onClick={() => {
							document.querySelector("#registerForm").submit();
						}}>
						회원가입
					</Button>
				</Form>
			</Container>
		);
	}
}
export default RegisterPage;
