import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import "./Styles/HeaderStyles.css";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

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
					Car Rental{" "}
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
						<h3>Log in</h3>
						<h3>Sign up</h3>

						<div className="flex">
							<DirectionsCarOutlinedIcon className="icon" />
							<h3>Become a host</h3>
						</div>

						<div className="border">
							<div className="flex top">
								<VpnKeyOutlinedIcon className="icon" />
								<h3>How Turo works</h3>
							</div>

							<div className="flex">
								<ContactPhoneOutlinedIcon className="icon" />
								<h3>Contact support</h3>
							</div>

							<div className="flex">
								<ArticleOutlinedIcon className="icon" />
								<h3>Legal</h3>
							</div>

							<div className="flex">
								<ShieldOutlinedIcon className="icon" />
								<h3>Insurance and protections</h3>
							</div>

							<div className="flex">
								<ConstructionOutlinedIcon className="icon" />
								<h3>Host tools</h3>
							</div>

							<div className="flex">
								<CalculateOutlinedIcon className="icon" />
								<h3>Calculator</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
