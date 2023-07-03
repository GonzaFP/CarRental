import createSlice from "@reduxjs/toolkit";

export const initialState = [
	{
		user: null,
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
				user: action.payload,
			};
		},
		logout: (state) => {
			return {
				...state,
				user: null,
			};
		},
	},
});

export const { login, logout } = ReducerFunction.actions;
export default ReducerFunction.reducer;
