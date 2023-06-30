import React from "react";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import "./Styles/protected.css";

function Protected() {
	return (
		<div className="protectedContainer">
			<img src="protected.jpg" alt="" />
			<div className="protect">
				<ShieldOutlinedIcon className="shield" />
				<h2>You're protected</h2>
				<div>
					<h3>Physical damage protection</h3>
					<p>
						Worried about bumps and scrapes? You can choose from two
						vehicle protection plans: the 65 plan or 75 plan. Both
						plans give peace of mind with protection against
						physical damage. Simply allocate a percentage of the
						trip price to cover the cost of a protection plan, then
						keep the rest as earnings.
					</p>
				</div>
				<h3>Liability insurance</h3>
				<p>
					All trips are covered by third-party auto liability
					insurance provided by Aioi Nissay Dowa Insurance, via our
					broker Aon.
				</p>
			</div>
		</div>
	);
}

export default Protected;
