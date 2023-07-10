import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	User: null,
	profile: null,
	favCar: [],
};

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
		addFavCar: (state, action) => {
			const foundItem = state.favCar.some(
				(item) => item.id === action.payload.id
			);
			if (!foundItem) {
				return {
					...state,
					favCar: [...state.favCar, action.payload],
				};
			} else {
				return {
					...state,
				};
			}
		},
		removeFavCar: (state, action) => {
			return {
				...state,
				favCar: state.favCar.filter(
					(item) => item.id !== action.payload
				),
			};
		},
	},
});

export const {
	login,
	logout,
	notify,
	uploadProfilePhoto,
	addFavCar,
	removeFavCar,
} = ReducerFunction.actions;
export default ReducerFunction.reducer;
