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
	MINIMUM_BIRTH_YEAR = 1990
	NUM_OF_BIRTH_YEARS = 15
	constructor(props) {
		super(props);
		this.state = {
			universities: [],
			majorInputHeight: 0,
			campusInputHeight: 0,
			heightTypes: [
				"많이 작은 편",
				"조금 작은 편", "보통", "조금 큰 편", "많이 큰 편"
			],
			//default value
			input: {
				university: {},
				birthYear: this.MINIMUM_BIRTH_YEAR,
				heightType: "보통",
				email: ""
			},
			validations: [
				{ type: "email", isValid: false },
				{ type: "nickname", isValid: false },
				{ type: "password", isValid: false },
				// { type: "profleMessage", isValid: false },
				// profileMessage는 보류
			]
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
		let validations = this.state.validations
		for (let validation of validations) {
			if (validation.type == "email") {
				validation.isValid = false
			}
		}
		this.setState({ ...this.state, validations, input: { ...this.state.input, email: emailValue } })
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
	passwordInputHandler = (e) => {
		let pi = document.querySelector("#passwordInput")
		let pci = document.querySelector("#passwordConfirmInput")
		let validatePassword = (_pi, _pci) => {

			if (_pi.value === _pci.value) return true
			else return false
		}
		let input = { ...this.state.input };
		input["password"] = pi.value
		input["passwordConfirm"] = pci.value
		let validations = this.state.validations
		for (let v of validations) {
			if (v.type === "password") v.isValid = validatePassword(pi, pci)
		}
		this.setState({ ...this.state, input, validations })
	}
	nicknameInputHandler = e => {
		let validations = this.state.validations
		for (let v of validations) {
			if (v.type === "nickname") v.isValid = (e.target.value != "")
		}
		let input = { ...this.state.input }
		input["nickname"] = e.target.value
		this.setState({ ...this.state, input, validations })
	}
	getInputChageHandler = (field, fcn = null) => {
		return e => {
			let input = { ...this.state.input };
			input[field] = e.target.value;

			this.setState({
				...this.state,
				input
			});
			setTimeout(() => {
				console.log(this.state);
			}, 500)
		};
	};

	validateEmail = e => {
		//이메일의 유효성 검사.
		//this.state.universities에 있는 domain을 이용.
		if (this.state.universities.filter((univ) => {
			this.state.input.email.includes(univ.domain)
		})) {
			fetch(process.env.REACT_APP_API_URL + `/validations/email?type=unique&email=${this.state.input.email}`, {
				method: "get",
				// headers: {
				// 	"Content-Type": "application/json",
				// }
			})
				.then(data => {
					return data.json();
				})
				.then(result => {
					console.log(result);
					let validations = this.state.validations
					if (result.result == true) {
						alert("유효한 이메일입니다.")
						for (let validation of validations) {
							if (validation.type == "email") {
								validation.isValid = true
							}
						}
						this.setState({ ...this.state, validations })
					}
					else {
						alert("중복된 이메일입니다.")
					}

				})
				.catch(e => {
					console.error(e);
				});

		} else {
			alert("지원되는 학교의 이메일이 아닙니다.\n지원되는 학교를 확인해주세요.\nemail 예시) test@khu.ac.kr")
		}
	}
	validate = () => {
		let notValid = this.state.validations.find(v => v.isValid == false)
		if (notValid == undefined) return true
		else throw new Error(notValid.type)
	}
	handleSubmit = e => {
		e.preventDefault();
		try {
			this.validate()

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
		} catch (e) {
			if (e.message === "email") {
				alert("email이 유효하지않습니다.\n\"유효성 확인\"을 부탁드립니다.")
			}
			else if (e.message === "nickname") {
				alert("닉네임을 입력해주시기 바랍니다.")
			}
			else if (e.message === "password") {
				alert("password와 password confirm이 일치하지 않습니다.")
			}
			else {
				alert("알 수 없는 오류입니다.\n개발자에게 문의부탁드립니다.")
			}
		}

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
						<Label for="emailInput">
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
							id="emailInput"
							onChange={this.handleEmailChange}
							placeholder="학교 이메일로만 가입이 가능합니다."
						/>
					</FormGroup>
					<Button block onClick={this.validateEmail}>
						유효성 확인
					</Button>
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
							onChange={this.nicknameInputHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input
							type="password"
							name="password"
							id="passwordInput"
							placeholder="복잡한 비밀번호를 입력해주세요."
							onChange={this.passwordInputHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password Confirm</Label>
						<Input
							type="password"
							name="passwordConfirm"
							id="passwordConfirmInput"
							placeholder="동일한 비밀번호를 입력해주세요."
							onChange={this.passwordInputHandler}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleSelect">Birth year</Label>
						<Input
							type="select"
							name="birthYear"
							id="birthYearInput"
							onChange={this.getInputChageHandler("birthYear")}>
							{Array.from({ length: this.NUM_OF_BIRTH_YEARS }, (x, i) => i).map(
								index => {
									return (
										<option key={index}>
											{index + this.MINIMUM_BIRTH_YEAR}
										</option>
									);
								}
							)}
						</Input>
					</FormGroup>
					<FormGroup>
						<Input
							type="select"
							name="heightType"
							id="heitTypeInput"
							defaultValue={{ value: "one", label: "tow" }}
							onChange={this.getInputChageHandler("heightType")}
						>

							{this.state.heightTypes.map(
								(ht, i) => {
									return (
										<option key={i}>
											{ht}
										</option>
									);
								}
							)}
						</Input>
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
