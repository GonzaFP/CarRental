import React from "react";
import "./Styles/carrenttal.css";

function HowCarRentalWorks() {
	return (
		<div className="carrental">
			<div className="sharingContainer">
				<h2>How CarRental works</h2>

				<div className="sharing">
					<img src="hand.jpg" alt="" />
					<div className="instruct">
						<div>
							<h3>
								{" "}
								<span className="number">1</span>&nbsp; Find the
								perfect car
							</h3>
							<p>
								Enter a location and date and browse thousands
								of cars shared by local hosts.
							</p>
						</div>

						<div>
							<h3>
								<span className="number">2</span>&nbsp; Book
								your trip
							</h3>
							<p>
								Book on the CarRental app or online, choose a
								protection plan, and say hi to your host! Cancel
								for free up to 24 hours before your trip.
							</p>
						</div>

						<div>
							<h3>
								{" "}
								<span className="number">3</span>&nbsp; Hit the
								road
							</h3>
							<p>
								Have the car delivered or pick it up from your
								host. Check in with the app, grab the keys, and
								hit the road!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default HowCarRentalWorks;
