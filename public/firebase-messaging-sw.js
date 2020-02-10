// index에서 firebase initiate 했는데 여기서 또 하네
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Background Message Title";
	const notificationOptions = {
		body: "Background Message body.",
		icon: "/email.png"
	};

	return self.registration.showNotification(
		notificationTitle,
		notificationOptions
	);
});
messaging.onMessage(function(payload) {
	console.log(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Foreground Message Title";
	const notificationOptions = {
		body: "Foreground Message body.",
		icon: "/email.png"
	};

	return self.registration.showNotification(
		notificationTitle,
		notificationOptions
	);
});

// self.addEventListener(`notificationclose`, function(e) {
// 	var notification = e.notification;
// 	var data = notification.data || {};
// 	var primaryKey = data.primaryKey;
// 	console.debug(`Closed notification: ` + primaryKey);
// });
// self.addEventListener(`notificationclick`, function(e) {
// 	var notification = e.notification;
// 	var data = notification.data || {};
// 	var primaryKey = data.primaryKey;
// 	var action = e.action;
// 	console.debug(`Clicked notification: ` + primaryKey);
// 	if (action === `close`) {
// 		console.debug(`Notification clicked and closed`, primaryKey);
// 		notification.close();
// 	} else {
// 		console.debug(`Notification actioned`, primaryKey);
// 		clients.openWindow("/");
// 		notification.close();
// 	}
// });
// self.addEventListener("push", event => {
// 	// const data = event.data.json();
// 	const data = event.data.json();
// 	console.log("New notification", data);
// 	const options = {
// 		body: data.body
// 	};
// 	event.waitUntil(self.registration.showNotification(data.title, options));
// });

// // //사용자에게 허가를 받아 토큰을 가져옵니다.
// // messaging
// // 	.requestPermission()
// // 	.then(function() {
// // 		return messaging.getToken();
// // 	})
// // 	.then(function(token) {
// // 		console.log(token);
// // 	})
// // 	.catch(function(err) {
// // 		console.log("fcm error : ", err);
// // 	});

// // messaging.onMessage(function(payload) {
// // 	alert("message received");
// // 	console.log(payload.notification.title);
// // 	console.log(payload.notification.body);
// // });
