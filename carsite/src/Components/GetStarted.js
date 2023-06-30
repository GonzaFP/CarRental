import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import RingVolumeOutlinedIcon from "@mui/icons-material/RingVolumeOutlined";
import StarPurple500OutlinedIcon from "@mui/icons-material/StarPurple500Outlined";
import "./Styles/GetStyles.css";
import { useNavigate } from "react-router-dom";

function GetStarted() {
	const navigate = useNavigate();
	return (
		<div className="getstart">
			<h2>We've got your back</h2>
			<div className="options">
				<div>
					<LanguageOutlinedIcon className="starticon" />
					<h3>Safe & trusted community</h3>
					<p>
						CarRental screens all guests before allowing them to
						book, so you can rest easy knowing your car is in good
						hands.
					</p>
				</div>

				<div>
					<RingVolumeOutlinedIcon className="starticon" />
					<h3>24/7 customer support</h3>
					<p>
						24/7 customer support is just a click away, and your
						guests have easy access to CarRental roadside
						assistance.
					</p>
				</div>

				<div>
					<StarPurple500OutlinedIcon className="starticon" />
					<h3>Two-way reviews</h3>
					<p>
						Both hosts and guests review each other after every
						trip, so you can see your guests’ reviews before hosting
						them.
					</p>
				</div>
			</div>

			<button onClick={() => navigate("/signin")}>List your car</button>
		</div>
	);
}

export default GetStarted;
