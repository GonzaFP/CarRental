import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	User: null,
	profile: null,
	favCar: [],
	initials: null,
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
		getInitials: (state, action) => {
			const initialsArray = action.payload.split(" ");
			const name = initialsArray[0][0] + initialsArray[1][0];
			const intials = name.toUpperCase();
			return {
				...state,
				initials: intials,
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
	getInitials,
} = ReducerFunction.actions;
export default ReducerFunction.reducer;
