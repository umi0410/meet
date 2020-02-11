// initiate again
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

// //사용자에게 허가를 받아 토큰을 가져옵니다.
// messaging
// 	.requestPermission()
// 	.then(function() {
// 		return messaging.getToken();
// 	})
// 	.then(function(token) {
// 		console.log(token);
// 	})
// 	.catch(function(err) {
// 		console.log("fcm error : ", err);
// 	});

// messaging.onMessage(function(payload) {
// 	alert("message received");
// 	console.log(payload.notification.title);
// 	console.log(payload.notification.body);
// });
