import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "./Styles/HeaderStyles.css";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { GrLogout } from "react-icons/gr";
import {
	MdOutlineManageAccounts,
	MdOutlineFavoriteBorder,
	MdOutlineForwardToInbox,
} from "react-icons/md";
import { PiRoadHorizonLight } from "react-icons/pi";

function Header() {
	const navigate = useNavigate();
	const [className, setClassName] = useState("hide");
	const [clearClass, setClearClass] = useState("clear");
	const [profileClass, setProfileClass] = useState("display");
	const [toggle, setToggle] = useState(false);

	const handleDisplay = () => {
		setClassName(() => {
			return toggle ? "show" : "hide";
		});
		setClearClass(() => {
			return toggle ? "display" : "clear";
		});
		setProfileClass(() => {
			return toggle ? "clear" : "display";
		});
		setToggle(!toggle);
	};

	return (
		<>
			<div className="navbar">
				<h3 className="logo" onClick={() => navigate("/")}>
					CarRental{" "}
				</h3>

				<div className="host">
					<button onClick={() => navigate("/host")}>
						Become a host
					</button>
				</div>

				<div className="dropdown" onClick={handleDisplay}>
					<ClearOutlinedIcon className={`${clearClass} clearIcon`} />
					<div className={`${profileClass} menu`}>
						<MenuIcon className="menuitem" />
						<AccountCircleOutlinedIcon className="menuitem account" />
					</div>

					<div className={`${className} dropdownmenu`}>
						<Link to="/signin">Log in</Link>
						<Link to="/firstsignup">Sign up</Link>

						<div>
							<div className="flex">
								<MdOutlineFavoriteBorder className="icon" />
								<Link to="/signin">Favorites</Link>
							</div>

							<div className="flex">
								<PiRoadHorizonLight className="icon" />
								<Link to="/signin">Trips</Link>
							</div>

							<div className="flex">
								<MdOutlineForwardToInbox className="icon" />
								<Link to="/signin">Inbox</Link>
							</div>

							<div className="flex">
								<AccountCircleOutlinedIcon className="icon" />
								<Link to="/host">Profile</Link>
							</div>

							<div className="flex">
								<MdOutlineManageAccounts className="icon" />
								<Link to="/host">Account</Link>
							</div>
						</div>
						<div className="flex">
							<DirectionsCarOutlinedIcon className="icon" />
							<Link to="/host">Become a host</Link>
						</div>

						<div className="flex top">
							<VpnKeyOutlinedIcon className="icon" />
							<Link to="/howworks">How Turo works</Link>
						</div>
						<div className="flex top">
							<GrLogout className="icon" />
							<Link to="/howworks">Log out</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
