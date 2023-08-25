import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./Styles/HeaderStyles.css";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Dropdown from "./dropdown";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

function Header() {
	const navigate = useNavigate();
	const { User, initials } = useSelector((state) => state.mainReducer);

	const [className, setClassName] = useState("hide");
	const [clearClass, setClearClass] = useState("clear");
	const [profileClass, setProfileClass] = useState("display");
	const [toggle, setToggle] = useState(false);
	const menuRef = useRef(null);

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

	useEffect(() => {
		document.addEventListener("mousedown", (event) => {
			if (!menuRef?.current?.contains(event.target)) {
				setClassName("hide");
			}
		});
	});

	return (
		<div ref={menuRef}>
			<Dropdown className={className} />
			<div className="navibar">
				<div className="navlogo">
					<h3 className="logo" onClick={() => navigate("/")}>
						CarRental{" "}
					</h3>
				</div>

				<div className="menuIcons">
					{User?.isAdmin ? (
						<div
							className="Admin"
							onClick={() => navigate("/summary")}>
							<h3>Admin</h3>
						</div>
					) : (
						<>
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

									<div className=" profilename account">
										{User?.photo ? (
											<Avatar
												src={User?.photo}
												alt={User?.photo}
												sx={{
													width: 24,
													height: 24,
												}}
												className="HeaderProfilePic menuitem account"
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
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
