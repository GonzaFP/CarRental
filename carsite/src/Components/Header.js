import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "./Styles/HeaderStyles.css";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Dropdown from "./dropdown";
import { useSelector } from "react-redux";

function Header() {
	const navigate = useNavigate();
	const { User } = useSelector((state) => state.mainReducer);
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
			<Dropdown className={className} />
			<div className="navibar">
				<div className="navlogo">
					<h3 className="logo" onClick={() => navigate("/")}>
						CarRental{" "}
					</h3>
				</div>

				<div className="menuIcons">
					<div className="hostBtn">
						<button onClick={() => navigate("/host")}>
							Become a host
						</button>
					</div>

					<div onClick={handleDisplay} className="dropdown">
						<ClearOutlinedIcon
							className={`${clearClass} clearIcon`}
						/>

						<div className={`${profileClass} menu`}>
							<MenuIcon className="menuitem" />
							{!User ? (
								<AccountCircleOutlinedIcon className="menuitem account" />
							) : (
								<div className=" profilename account">
									{User?.name || User?.email[0].toUpperCase()}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;

{
	/* <div className="dropdown" onClick={handleDisplay}>
						<ClearOutlinedIcon
							className={`${clearClass} clearIcon`}
						/>
						<div className={`${profileClass} menu`}>
							<MenuIcon className="menuitem" />
							{!User ? (
								<AccountCircleOutlinedIcon className="menuitem account" />
							) : User?.photo ? (
								<img src={User?.photo} alt="" id="profilepic" />
							) : (
								<div className=" profilename">
									{User.name || User.email[0].toUpperCase()}
								</div>
							)}
						</div>
						<Dropdown className={className} />
					</div>
				</div>
			</div>
		</> */
}
