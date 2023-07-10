import { configureStore } from "@reduxjs/toolkit";
import ReducerFunction from "./ReducerFunction";
export const store = configureStore({
	reducer: {
		mainReducer: ReducerFunction,
	},
});
