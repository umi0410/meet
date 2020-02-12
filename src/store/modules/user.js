const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const GET_ACCOUNT = "user/GET_ACCOUNT";
const SET_CHAT_ROOM = "user/SET_CHAT_ROOM";
// const GET_USERID_TO_READ = "user/GET_USERID_TO_READ";

export const login = account => ({ type: LOGIN, ...account });
export const getAccount = () => ({ type: GET_ACCOUNT });
export const setChatRoom = chatRoom => ({ type: SET_CHAT_ROOM, ...chatRoom });
const initialState = {
	email: undefined,
	nickname: undefined,
	totalHearts: 10,
	currentHearts: 0,
	userToRead: undefined
};
// export const getUserIdToRead = () => ({
// 	type: GET_USERID_TO_READ
// });
//리듀서 작성
export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				email: action.email,
				nickname: action.nickname,
				university: action.university,
				isEmailVerified: action.isEmailVerified,
				_id: action._id
			};
		case GET_ACCOUNT:
			return state;
		case SET_CHAT_ROOM:
			return {
				...state,
				chatRoom: action.match,
				partner: action.partner,
				socket: action.socket
			};

		case LOGOUT:
			return {
				...state,
				email: "logged out",
				nickname: "no user"
			};
		// case GET_USERID_TO_READ:
		// 	return state;
		default:
			return state;
	}
}
