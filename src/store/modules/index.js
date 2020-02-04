import { combineReducers } from "redux";
import user from "./user";
import meeting from "./meeting";
export default combineReducers({
	user,
	meeting
	// 다른 리듀서를 만들게되면 여기에 넣어줌..
});
