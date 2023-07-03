import React from "react";
import "./Styles/insurance.css";
function Insurance() {
	return (
		<div className="insurance">
			<img src="insurance.jpg" />
			<h2>You're protected</h2>
			<div>
				<h3>Physical damage protection</h3>
				<p>
					Choose from three protection plans — Premier, Standard, or
					Minimum — to get the level of protection that’s right for
					you. Spring for Premier for peace of mind, or pay less for
					lighter protection with higher out-of-pocket costs for
					vehicle damage or theft.
				</p>
			</div>

			<div>
				<h3>Liability insurance included</h3>
				<p>
					All trips are covered by third-party auto liability
					insurance provided by Aioi Nissay Dowa Insurance.
				</p>
			</div>
			<div>
				<h3>24/7 support & roadside assistance</h3>
				<p>
					24/7 roadside assistance is just a call away to keep you
					safe and on the road.
				</p>
			</div>
		</div>
	);
}

export default Insurance;
