/* eslint-disable*/
import React, { useState, Component } from "react";
import { connect } from "react-redux";
import { login, getAccount } from "../store/modules/user";
import logo from "../logo.svg";
import settings from "../settings";
import utils from "../utils";
import "../App.css";
import "../fonts.css";
import "../fade.css";
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
import FadeIn from "react-fade-in";
class MeetingPage extends Component {
	state = { partner: {} };
	getMatch = () => {
		fetch(settings.apiServer + `/meetings`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": utils.extractCookies("token")
			}
		})
			.then(res => {
				console.log(res);
				return res.json();
			})
			.then(data => {
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				this.setState({ ...this.state, partner: data });
			})
			.catch(err => {
				console.error("Error:", err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	};
	componentDidMount() {
		this.getMatch();
	}
	handleLike = () => {
		fetch(
			settings.apiServer +
				`/meetings?action=like&id=${this.state.partner._id}`,
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"x-access-token": utils.extractCookies("token")
				}
			}
		)
			.then(res => res.json())
			.then(data => {
				//아주 위험한 행위지만 일당 쿠키 그냥 박음
				// console.log(data);
				//데이터에 match 정보가 있다는 것은 match가 성사되었다는 것.
				console.log(data);
				if (data.match) {
					alert(
						data.match.participants[0].nickname +
							"님과 " +
							data.match.participants[1].nickname +
							"님이 연결되셨습니다.\n적극적으로먼저연락해보세요!"
					);
				}
				this.getMatch();
			})
			.catch(err => {
				console.error("Error:", err);
				alert(
					"로그인 정보가 올바르지 않습니다.\n확인하고 다시 시도해주세요."
				);
			});
	};
	render() {
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
							<Button
								style={{ opacity: "0.6" }}
								onClick={this.handleLike}>
								Like
							</Button>
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
							<span style={{ fontWeight: "bold" }}>
								{this.state.partner.nickname}
							</span>
							, 24
							<br></br>
							<p>
								<span>{this.state.partner.university} </span>
								<span style={{ color: "gray" }}>
									컴퓨터 공학과
								</span>
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
				<Container fluid={true} id="meetingContainer">
					{/* profile message */}
					<Row style={{ background: "#f8f8f8" }} className="pt-2">
						<Col xs="1" className="m-1 p-0">
							<img
								src="/quotes_0.png"
								style={{ width: "100%" }}></img>
						</Col>
						<Col size="10" className="mt-2">
							<p>{this.state.partner.profileMessage}</p>
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
								<p
									style={{
										borderBottom: "1px solid lightgray"
									}}>
									바라는 데이트 유형은 무엇인가요?
								</p>
								<p>
									- 특별한 것을 하지 않아도, 함께함으로써
									특별할 수 있는 데이트요.
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
								<p
									style={{
										borderBottom: "1px solid lightgray"
									}}>
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
export default connect(mapStateToProps, mapDispatchToProps)(MeetingPage);
