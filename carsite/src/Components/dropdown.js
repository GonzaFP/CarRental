import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import {
	MdOutlineManageAccounts,
	MdOutlineFavoriteBorder,
	MdOutlineForwardToInbox,
} from "react-icons/md";
import { PiRoadHorizonLight } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { logout } from "../Store/ReducerFunction";
import { auth } from "../Firebase/Firebase";

function Dropdown({ className }) {
	const dispatch = useDispatch();
	const { User, initials } = useSelector((state) => state.mainReducer);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [showSign, setShowSign] = useState(true);

	const Logout = async () => {
		if (User) {
			await signOut(auth);
			dispatch(logout());
			navigate("/signin");
			setShow(false);
			setShowSign(true);
		}
	};

	useEffect(() => {
		if (User) {
			setShow(true);
			setShowSign(false);
			return;
		}
	}, [User]);

	return (
		<div className={`${className} DropdownContainer`}>
			<div className="DropdownWrapper">
				<div className="DropdownMenu">
					{showSign && (
						<div className="auth">
							<Link to="/signin">
								<span>Log in</span>
							</Link>
							<Link to="/firstsignup">
								<span>Sign up</span>
							</Link>
						</div>
					)}

					{show && (
						<>
							<Link to="/favourites">
								<div className="flex">
									<MdOutlineFavoriteBorder className="icon" />
									<span>Favourites</span>
								</div>
							</Link>

							<Link to="/booked">
								<div className="flex">
									<PiRoadHorizonLight className="icon" />
									<span>Trips</span>
								</div>
							</Link>

							<Link to="messages">
								<div className="flex">
									<MdOutlineForwardToInbox className="icon" />
									<span>Inbox</span>
								</div>
							</Link>
							<hr />

							<Link to="/profile">
								<div className="flex ">
									{User?.photo ? (
										<Avatar
											src={User?.photo}
											alt={User?.photo}
											sx={{
												width: 24,
												height: 24,
											}}
											className="HeaderProfilePic"
										/>
									) : (
										<Avatar
											sx={{
												bgcolor: deepPurple[500],
												width: 24,
												height: 24,
											}}>
											{initials && initials}
										</Avatar>
									)}

									<span>Profile</span>
								</div>
							</Link>

							<Link to="/accounts">
								<div className="flex">
									<MdOutlineManageAccounts className="icon" />
									<span>Account</span>
								</div>
							</Link>
						</>
					)}

					<Link to="/host">
						<div className="flex">
							<DirectionsCarOutlinedIcon className="icon" />
							<span>Become a host</span>
						</div>
					</Link>
					<hr />

					<Link to="/howworks">
						<div className="flex top">
							<VpnKeyOutlinedIcon className="icon" />
							<span>How CarRental works</span>
						</div>
					</Link>

					{show && (
						<div className="flex top" onClick={Logout}>
							<GrLogout className="icon" id="icon" />
							<span>Log out</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
