function parseJwt(token) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function(c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}

function extractCookies(name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2)
		return parts
			.pop()
			.split(";")
			.shift();
}

function deleteCookie(name) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

//function으로 선언=> this 가 바뀌어
function handleInputChange(fieldName) {
	return e => {
		let input = this.state.input;
		input[fieldName] = e.target.value;
		this.setState({ ...this.state, input: input });
		// console.log(input);
	};
}

export default {
	parseJwt: parseJwt,
	extractCookies: extractCookies,
	deleteCookie: deleteCookie,
	handleInputChange
};
