/* eslint-disable*/
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import settings from "./settings";
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
const LoginPage = props => {
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
					/>
				</FormGroup>
				<FormGroup>
					<Label for="passwordInput">Password</Label>
					<Input
						type="password"
						name="password"
						id="passwordInput"
						placeholder="비밀번호"
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
							document.querySelector("#loginForm").submit();
						}}>
						로그인
					</Button>
					<Button
						className="m-auto"
						size="sm"
						onClick={() => {
							window.location.href = "register";
						}}>
						회원가입
					</Button>
				</Row>
			</Form>
		</Container>
	);
};
export default LoginPage;
