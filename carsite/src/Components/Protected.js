import React from "react";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import "./Styles/protected.css";
import { protectedData } from "../Data/FAQData";

function Protected() {
	let data = protectedData.map((item) => {
		return (
			<>
				<h3>{item.title}</h3>
				<p>{item.type}</p>
			</>
		);
	});

	return (
		<section className="sharingSection protectedSection">
			<div className="sharingContainer">
				<div className="sharingLeft">
					<img src="ben.jpg" alt="" />
				</div>

				<div className="sharingRight">
					<h2>You're protected</h2>

					<div className="sharingOptions">{data}</div>
				</div>
			</div>
		</section>
	);
}

export default Protected;
