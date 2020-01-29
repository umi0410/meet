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
	Fade
} from "reactstrap";
const MeetingPage = props => {
	return (
		<React.Fragment>
			{/* Main introducing */}

			{/* fixed picker */}
			<Container
				fluid={true}
				style={{
					position: "fixed",
					bottom: "20px",
					zIndex: "999"
				}}>
				<Row className="justify-content-center" style={{}}>
					<Col>
						<Button
							style={{ opacity: "0.6" }}
							className="float-right">
							Hate
						</Button>
					</Col>
					<Col>
						<Button style={{ opacity: "0.6" }}>Like</Button>
					</Col>
				</Row>
			</Container>
			{/* profile starts */}
			<Container fluid={true} className="mt-2">
				<Badge color="warning" className="mr-1">
					# 공대남
				</Badge>
				<Badge color="secondary" className="mr-1">
					# V.I.P
				</Badge>
				<Row className="clearfix">
					<Col className="" size={1}>
						<span style={{ fontWeight: "bold" }}>Hello</span>, 24
						<br></br>
						<p>
							<span>경희대학교 </span>
							<span style={{ color: "gray" }}>컴퓨터 공학과</span>
							<br />
							<span>176 / 78</span>
						</p>
					</Col>
					<img
						className="float-right"
						src="/khu.jpg"
						style={{ width: "25vw", opacity: "0.5" }}></img>
				</Row>
			</Container>
			<Container fluid={true}>
				{/* profile message */}
				<Row style={{ background: "#f8f8f8" }} className="pt-2">
					<Col xs="1" className="m-1 p-0">
						<img
							src="/quotes_0.png"
							style={{ width: "100%" }}></img>
					</Col>
					<Col size="10" className="mt-2">
						<p>
							가나다라마바사 쌈마이웨이 미스함무라비, 멜로가 체질,
							흔들리는 꽃들 속에서 네 샴푸향이 느껴진거야 알아?
							흑흑
							<br />할 일 없는 찐따 끼리 연락하자
						</p>
					</Col>
					<Col xs="1" className="m-1 p-0">
						<img
							src="/quotes_1.png"
							style={{ width: "100%" }}></img>
					</Col>
				</Row>

				{/* Likes */}
				<div className="mt-4 mb-4" style={{}}>
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
							<h3>
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
							</h3>
						</Col>
					</Row>
				</div>

				{/* hates */}
				<div className="mb-4" style={{}}>
					<Row>
						<Col>
							<h5
								style={{
									fontFamily: "Amarillo",
									color: "#211557"
								}}>
								hates
							</h5>
						</Col>
					</Row>

					{/* hates-hashtags */}
					<Row>
						<Col>
							<h3>
								<Badge
									className="mr-1"
									style={{
										color: "#211557",
										background: "white",
										border: "1px solid #211557"
									}}>
									소주
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: "#211557",
										background: "white",
										border: "1px solid #211557"
									}}>
									독서
								</Badge>
								<Badge
									className="mr-1"
									style={{
										color: "#211557",
										background: "white",
										border: "1px solid #211557"
									}}>
									싸움
								</Badge>
							</h3>
						</Col>
					</Row>
				</div>
				{/* cardview 시작 */}
				<div
					style={{
						background: "#f8f8f8",
						width: "100vw",
						paddingLeft: "0px",
						paddingRight: "0px",
						marginLeft: "-15px"
						// marginRight: "0px;"
					}}
					className="pt-3 pb-3">
					{/* Row가 한 Card */}
					<Row className="pt-2 pb-2 mr-0 ml-0">
						<Col
							xs="10"
							className="m-auto"
							style={{
								borderRadius: "8px",
								background: "white",
								boxShadow: "0px 0px 23px 1px lightgray"
							}}>
							<p style={{ borderBottom: "1px solid lightgray" }}>
								바라는 데이트 유형은 무엇인가요?
							</p>
							<p>
								- 특별한 것을 하지 않아도, 함께함으로써 특별할
								수 있는 데이트요.
							</p>
						</Col>
					</Row>

					<Row className="pt-2 pb-2 mr-0 ml-0">
						<Col
							xs="10"
							className="m-auto"
							style={{
								borderRadius: "8px",
								background: "white",
								boxShadow: "0px 0px 23px 1px lightgray"
							}}>
							<p style={{ borderBottom: "1px solid lightgray" }}>
								자신이 생각하는 자신의 장점은?
							</p>
							<p>
								- 요리를 잘해요...ㅎㅎ 같이 도시락 싸서
								피크닉가고 산책했으면 좋겠어요!
							</p>
						</Col>
					</Row>
				</div>
			</Container>
		</React.Fragment>
	);
};
export default MeetingPage;
