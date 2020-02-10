/* eslint-disable*/
import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
//redux 이용하기
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/modules";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import utils from "./utils";
// import { subscribeUser, showNotification } from "./subscription";
require("dotenv").config();
const devTools =
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
// **** 리덕스 개발자도구 적용
ReactDOM.render(
	<Provider store={store}>
		<App store={store} />
	</Provider>,
	document.getElementById("root")
);

//index.js에서 serviceWorker가 가능한지 보고 firebase initiate
if ("serviceWorker" in navigator) {
	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: "AIzaSyAVOXx6_RSK2YSCse5Whk0_dPR0wlawCYo",
		authDomain: "meet-eefdd.firebaseapp.com",
		databaseURL: "https://meet-eefdd.firebaseio.com",
		projectId: "meet-eefdd",
		storageBucket: "meet-eefdd.appspot.com",
		messagingSenderId: "175523276313",
		appId: "1:175523276313:web:d1b0bb50f2b241aa0b2c88",
		measurementId: "G-4ZVYJTWWCV"
	};

	firebase.initializeApp(firebaseConfig);
	const messaging = firebase.messaging();

	messaging.usePublicVapidKey(
		"BJ1XDo_NY6jFqm1ymMnIwHJ416JNpFtORiIiSYHQTI8nK-ZXaxIEq5XW-hnax4bjjAynv1ORFZIFpojTRKsF4Do"
	);
	Notification.requestPermission().then(function(permission) {
		if (permission === "granted") {
			console.log("Notification permission granted.");
		} else {
			console.log("Unable to get permission to notify.");
		}
	});
	messaging.onMessage(function(payload) {
		console.log("onMessage: ", payload);

		var title = payload.notification.title;
		var options = {
			body: payload.notification.body,
			icon: payload.notification.image
		};
		var notification = new Notification("On", options);
	});

	messaging.getToken().then(token => {
		console.log(token);
		fetch(process.env.REACT_APP_API_URL + "/pushes", {
			method: "post",
			body: JSON.stringify({ pushToken: token }),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": utils.extractCookies("token")
			}
		})
			.then(d => {
				return d.json();
			})
			.then(j => {
				console.log(j);
			})
			.catch(e => {
				console.error(e);
			});
	});
} else
	alert("serviceWorker is unavailable. Please connect to the https server");
