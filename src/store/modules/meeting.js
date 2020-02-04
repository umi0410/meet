const SET_MEETING_PARTNER = "meeting/SET_MEETING_PARTNER";
const SET_NO_MEETING = "meeting/SET_NO_MEETING";
// const SET_CHAT_ROOM = "user/SET_CHAT_ROOM";
const initialState = {
	partner: {},
	status: "beforeLoading"
};

export const setMeetingPartner = partner => ({
	type: SET_MEETING_PARTNER,
	...partner
});
export const setNoMeeting = partner => ({
	type: SET_NO_MEETING
});

//리듀서 작성
export default function meeting(state = initialState, action) {
	switch (action.type) {
		case SET_MEETING_PARTNER:
			return {
				...state,
				partner: { ...action }
			};
		case SET_NO_MEETING:
			return {
				...state,
				partner: { ...initialState }
			};
		default:
			return state;
	}
}
