import utils from "./utils";
const convertedVapidKey = urlBase64ToUint8Array(
	process.env.REACT_APP_PUBLIC_VAPID_KEY
);

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	// eslint-disable-next-line
	const base64 = (base64String + padding)
		.replace(/\-/g, "+")
		.replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

function sendSubscription(subscription) {
	subscription = JSON.parse(JSON.stringify(subscription));
	subscription.data = { email: "essence0410@khu.ac.kr" };
	return fetch(
		`${process.env.REACT_APP_API_URL}/push/notifications/subscribe`,
		{
			method: "POST",
			body: JSON.stringify(subscription),
			headers: {
				"Content-Type": "application/json",
				"x-access-token": utils.extractCookies("token")
			}
		}
	);
}

export function subscribeUser() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then(function(registration) {
				if (!registration.pushManager) {
					// console.log("Push manager unavailable.");
					return;
				}
				var title = "Simple Title";
				var options = {
					body:
						"Simple piece of body text.\nSecond line of body text :)"
				};
				// // alert("inside");
				// registration.showNotification(title, options);

				registration.pushManager
					.getSubscription()
					.then(function(existedSubscription) {
						if (existedSubscription === null) {
							// console.log(
							// 	"No subscription detected, make a request."
							// );
							registration.pushManager
								.subscribe({
									applicationServerKey: convertedVapidKey,
									userVisibleOnly: true
								})
								.then(function(newSubscription) {
									// console.log("New subscription added.");
									// sendSubscription(newSubscription);
								})
								.catch(function(e) {
									if (Notification.permission !== "granted") {
										// console.log(
										// 	"Permission was not granted."
										// );
									} else {
										console.error(
											"An error ocurred during the subscription process.",
											e
										);
									}
								});
						} else {
							// console.log("Existed subscription detected.");
							// console.log(existedSubscription);
							sendSubscription(existedSubscription);
						}
					});
			})
			.catch(function(e) {
				console.error(
					"An error ocurred during Service Worker registration.",
					e
				);
			});
	}
}

export function showNotification(title, options) {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then(function(registration) {
				if (!registration.pushManager) {
					console.log("Push manager unavailable.");
					return;
				}
				registration.showNotification(title, options);
			})
			.catch(function(e) {
				console.error(
					"An error ocurred during Service Worker registration.",
					e
				);
			});
	}
}
