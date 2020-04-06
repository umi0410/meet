fetch(process.env.REACT_APP_API_URL + `/validations/email?type=unique&email=${this.state.input.email}`, {
    method: "get",
    // headers: {
    // 	"Content-Type": "application/json",
    // }
})
    .then(data => {
        return data.json();
    })
    .then(result => {
        console.log(result);
        if ()
            alert("유효한 이메일입니다.")
    })
    .catch(e => {
        console.error(e);
    });