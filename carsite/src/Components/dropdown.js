import React, { useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
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
									{!User ? (
										<AccountCircleOutlinedIcon className="icon" />
									) : User?.photo ? (
										<img
											src={User.photo}
											alt=""
											id="profilepic"
										/>
									) : (
										<div className="profiler">
											{initials && initials}
										</div>
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
							<GrLogout className="icon" />
							<span>Log out</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
