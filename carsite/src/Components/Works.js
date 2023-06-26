import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import TrendingFlatOutlinedIcon from "@mui/icons-material/TrendingFlatOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import "./Styles/Works.css";
function Works() {
	return (
		<div>
			<h3>How it works</h3>
			<div className="works">
				<div>
					<SearchOutlinedIcon className="icon" />
					<h4> 01. Select your car</h4>
					<p>
						Select your car, choose your location, time and pick it
						up.
					</p>
				</div>

				<div>
					<MedicalInformationOutlinedIcon className="icon" />
					<h4>02. Define your booking</h4>
					<p>
						Fill your information into the form and go to the next
						step.
					</p>
				</div>

				<div>
					<LocalAtmOutlinedIcon className="icon" />
					<h4>03. Payment</h4>
					<p>
						Select your payment, click ok and it's all done for you.
					</p>
				</div>
			</div>
		</div>
	);
}

export default Works;
