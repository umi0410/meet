const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const GET_ACCOUNT = "user/GET_ACCOUNT";
export const login = account => ({ type: LOGIN, ...account });
export const getAccount = () => ({ type: GET_ACCOUNT });
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
		case GET_ACCOUNT:
			return state;

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
