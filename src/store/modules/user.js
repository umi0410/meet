const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

export const login = color => ({ type: LOGIN, color });

const initialState = {
	email: undefined,
	nickname: undefined,
	totalHearts: 10,
	currentHearts: 0
};

//리듀서 작성
export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				email: action.email,
				nickname: action.nickname
			};
		case LOGOUT:
			return {
				...state,
				email: "logged out",
				nickname: "no user"
			};
		default:
			return state;
	}
}
