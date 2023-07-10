import { createSlice } from "@reduxjs/toolkit";

export const initialState = [
	{
		User: null,
		profile: null,
	},
];

export const ReducerFunction = createSlice({
	name: "appReducer",
	initialState,
	reducers: {
		// !this is where the reducers will go.
		login: (state, action) => {
			return {
				...state,
				User: action.payload,
			};
		},
		logout: (state) => {
			return {};
		},
		notify: (state, action) => {
			return {
				...state,
				User: {
					...state.User,
					sendNotification: action.payload.sendNotification,
				},
			};
		},
		uploadProfilePhoto: (state, action) => {
			return {
				...state,
				User: {
					...state.User,
					photo: action.payload.profilePhoto,
				},
			};
		},
	},
});

export const { login, logout, notify, uploadProfilePhoto } =
	ReducerFunction.actions;
export default ReducerFunction.reducer;
