import React from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
	const { User } = useSelector((state) => state.mainReducer);
	return User ? <Outlet /> : <SignIn />;
}

export default ProtectedRoute;
