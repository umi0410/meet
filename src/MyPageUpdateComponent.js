/* eslint-disable*/
import React, { useState, Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts.css";
import utils from "./utils";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import "./MyPage.css";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Container,
	Row,
	Col,
	Badge,
	Fade
} from "reactstrap";
class MyPageUpdateComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { input: {} };
	}
	componentDidMount() {}
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
	render() {
		const likesColor = "#f26666";
		const hatesColor = "#3e5375";
		return (
			<React.Fragment>
				<Container className="mt-4 mb-4">
					<Form
						action={
							process.env.REACT_APP_API_URL +
							`/users/${utils.parseJwt(
								utils.extractCookies("token")
							)}`
						}
						method="put"
						id="updateForm">
						<FormGroup>
							<Row>
								<Col xs="4">
									<Label for="nicknameInput">닉네임</Label>
								</Col>
								<Col xs="8">
									<Input
										type="text"
										name="nickname"
										id="nicknameInput"
										onChange={this.getInputChageHandler(
											"nickname"
										)}
									/>
								</Col>
							</Row>
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
					</Form>
				</Container>
			</React.Fragment>
		);
	}
}

export default MyPageUpdateComponent;
