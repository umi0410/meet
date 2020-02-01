self.addEventListener(`notificationclose`, function(e) {
	var notification = e.notification;
	var data = notification.data || {};
	var primaryKey = data.primaryKey;
	console.debug(`Closed notification: ` + primaryKey);
});
self.addEventListener(`notificationclick`, function(e) {
	var notification = e.notification;
	var data = notification.data || {};
	var primaryKey = data.primaryKey;
	var action = e.action;
	console.debug(`Clicked notification: ` + primaryKey);
	if (action === `close`) {
		console.debug(`Notification clicked and closed`, primaryKey);
		notification.close();
	} else {
		console.debug(`Notification actioned`, primaryKey);
		clients.openWindow("/");
		notification.close();
	}
});
self.addEventListener("push", event => {
	// const data = event.data.json();
	const data = event.data.json();
	console.log("New notification", data);
	const options = {
		body: data.body
	};
	event.waitUntil(self.registration.showNotification(data.title, options));
});
