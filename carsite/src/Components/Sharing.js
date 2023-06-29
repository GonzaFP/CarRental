import React from "react";
import "./Styles/Sharing.css";
function Sharing() {
	return (
		<div className="sharingContainer">
			<h2>How sharing your car works</h2>

			<div className="sharing">
				<div className="instruct">
					<div>
						<h3>List your car for free</h3>
						<p>
							Share your truck, sports car, or anything in
							between. Listing takes about 10 minutes and is free
							— no sign-up charges, no monthly fees.
						</p>
					</div>

					<div>
						<h3>Set your price & rules</h3>
						<p>
							Lay your own ground rules and customize when your
							car is available. Set your own daily price, or let
							us automatically adjust your price to maximize your
							earnings.
						</p>
					</div>

					<div>
						<h3>Welcome your guests</h3>
						<p>
							When a guest books your car, you’ll confirm where
							and how to hand over the keys before the trip. Check
							your guest in with the Car Rental app, then sit back
							and relax until the trip is over.
						</p>
					</div>
					<div>
						<h3>Sit back & earn</h3>
						<p>
							Get paid via direct deposit within three days after
							each trip. You’ll earn 65% or 75% of the trip price,
							based on the level of protection you choose. You'll
							also get reimbursed for things like fuel and any
							mileage beyond your limit.
						</p>
					</div>

					<div></div>
				</div>
				<img src="drive.jpg" alt="" />
			</div>
		</div>
	);
}

export default Sharing;
