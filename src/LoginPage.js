/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "./store/modules/user";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import settings from "./settings";
import utils from "./utils";
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
class LoginPage extends Component {
	state = { input: {} };
	handleInputChange = fieldName => {
		return e => {
			let input = this.state.input;
			input[fieldName] = e.target.value;
			this.setState({ ...this.state, input: input });
			// console.log(input);
		};
	};
	handleSubmit = () => {
		fetch(settings.apiServer + `/users/login`, {
			method: "POST",
			body: JSON.stringify(this.state.input),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				document.cookie = "token=" + data.token;
				this.props.login(utils.parseJwt(data.token));
				window.location.href = "/";
			})
			.catch(err => {
				console.error("Error:", err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	};
	render() {
		const { user } = this.props;
		return (
			<Container className="mb-4 mt-4">
				<Row className=" justify-content-center">
					<Col xs="6">
						<img src="/love.png" style={{ width: "100%" }}></img>
					</Col>
				</Row>
				<Form
					action={settings.apiServer + "/users/login"}
					method="post"
					id="loginForm">
					<FormGroup>
						<Label for="emailInput">Email</Label>
						<Input
							type="email"
							name="email"
							id="emailInput"
							placeholder="학교 이메일"
							onChange={this.handleInputChange("email")}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Password</Label>
						<Input
							type="password"
							name="password"
							id="passwordInput"
							placeholder="비밀번호"
							onChange={this.handleInputChange("password")}
							onKeyPress={e => {
								if (e.key == "Enter") {
									e.preventDefault();
									this.handleSubmit();
								}
							}}
						/>
					</FormGroup>

					<FormText color="muted">
						신뢰성 있는 서비스를 위하여 각 학교별 공식 이메일을 통해
						인증을 진행하고 있습니다. 따라서 본인의 학교 이메일을
						통해서만 회원가입, 로그인을 하실 수 있습니다.
					</FormText>
					{/* 바로 Row 넣어버림. */}
					<Row className="justify-content-center  mt-3">
						<Button className="m-auto" size="sm">
							비밀번호 찾기
						</Button>
						<Button
							className="m-auto"
							size="sm"
							onClick={() => {
								this.handleSubmit();
							}}>
							로그인
						</Button>
						<Button
							className="m-auto"
							size="sm"
							onClick={() => {
								this.handleSubmit();
							}}>
							회원가입
						</Button>
					</Row>
				</Form>
			</Container>
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
	getAccount: () => dispatch(getAccount())
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
