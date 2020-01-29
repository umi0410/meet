/* eslint-disable*/

import React, { useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import "../fonts.css";
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
const MeetingSetting = props => {
	const script = document.createElement("script");

	script.src = "/utils.js";
	script.async = false;
	const likesColor = "#f26666";
	const hatesColor = "#211557";
	document.body.appendChild(script);
	return (
		<React.Fragment>
			<div style={{ background: "#f5f5f5" }}>
				<Container className="pt-3">
					<p>
						# 만남을 진행하기 위해선 "likes",, "hates"를 5개 이상,
						문답을 2개 이상 작성해주세요.
					</p>
				</Container>
			</div>
			<div>
				<Container fluid={true}>
					<Row>
						<Col>
							<h5
								style={{
									fontFamily: "Amarillo",
									color: "#f26666"
								}}>
								likes
							</h5>
						</Col>
					</Row>

					{/* likes-hashtags */}
					<Row>
						<Col>
							<h4>
								<Badge
									className="mr-1"
									style={{
										color: "#f26666",
										background: "white",
										border: "1px solid #f26666"
									}}>
									맥주
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: "#f26666",
										background: "white",
										border: "1px solid #f26666"
									}}>
									영화보기
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: "#f26666",
										background: "white",
										border: "1px solid #f26666"
									}}>
									보드타기
								</Badge>
								<Badge
									className="mr-1"
									style={{
										background: "#f26666",
										color: "white"
									}}>
									영화보기
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: "#f26666",
										background: "white",
										border: "1px solid #f26666"
									}}>
									보드타기
								</Badge>
							</h4>
						</Col>
					</Row>

					{/* hates */}
					<Row className="mt-3">
						<Col>
							<h5
								style={{
									fontFamily: "Amarillo",
									color: hatesColor
								}}>
								hates
							</h5>
						</Col>
					</Row>
					{/* hates-hashtags */}
					<Row>
						<Col>
							<h4>
								<Badge
									className="mr-1"
									style={{
										color: hatesColor,
										background: "white",
										border: "1px solid " + hatesColor
									}}>
									소주
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: hatesColor,
										background: "white",
										border: "1px solid " + hatesColor
									}}>
									독서
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: "white",
										background: hatesColor
									}}>
									싸움
								</Badge>
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
						<Row
							style={{ position: "fixed", width: "100%" }}
							className="justify-content-center">
							<Col xs="8">
								<Button block>수정하기</Button>
							</Col>
						</Row>
						<FormGroup>
							<Label for="exampleEmail">
								가장 좋아하는 데이트 스타일은 어떤 건가요?
							</Label>
							<Input type="text" />
							<FormText>최소한 5글자는 적어주세요!</FormText>

							<Label for="exampleEmail">
								본인의 장점이 무엇이라고 생각하시나요?
							</Label>
							<Input type="text" />
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
};
export default MeetingSetting;
