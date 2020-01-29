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
const RegisterPage = props => {
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
				action={settings.apiServer + "/users/register"}
				method="post"
				id="registerForm">
				<FormGroup>
					<Label for="exampleEmail">학교 이메일</Label>
					<Input
						type="email"
						name="email"
						id="exampleEmail"
						placeholder="학교 이메일로만 가입이 가능합니다."
					/>
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
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
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
						내 키와 몸무게를 비공개할 경우 상대방의 키와 몸무게도 볼
						수 없습니다.
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

				{/* <FormGroup>
					<Label for="exampleFile">File</Label>
					<Input type="file" name="file" id="exampleFile" />
					<FormText color="muted">
						This is some placeholder block-level help text for the
						above input. It's a bit lighter and easily wraps to a
						new line.
					</FormText>
				</FormGroup>
				<FormGroup tag="fieldset">
					<legend>Radio Buttons</legend>
					<FormGroup check>
						<Label check>
							<Input type="radio" name="radio1" /> Option one is
							this and that—be sure to include why it's great
						</Label>
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input type="radio" name="radio1" /> Option two can
							be something else and selecting it will deselect
							option one
						</Label>
					</FormGroup>
					<FormGroup check disabled>
						<Label check>
							<Input type="radio" name="radio1" disabled /> Option
							three is disabled
						</Label>
					</FormGroup>
				</FormGroup> */}

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
};
export default RegisterPage;
