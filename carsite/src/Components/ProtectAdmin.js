import React from "react";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";
import { Outlet } from "react-router-dom";

function ProtectAdmin() {
	const { User } = useSelector((state) => state.mainReducer);
	return User?.isAdmin ? <Outlet /> : <h3>Access denied</h3>;
}

export default ProtectAdmin;
