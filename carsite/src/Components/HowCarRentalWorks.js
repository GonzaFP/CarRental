import React from "react";

function HowCarRentalWorks() {
	return (
		<div>
			<div className="sharingContainer">
				<h2>How CarRental works</h2>

				<div className="sharing">
					<div className="instruct">
						<div>
							<h3>
								{" "}
								<span>1</span> Find the perfect car
							</h3>
							<p>
								Enter a location and date and browse thousands
								of cars shared by local hosts.
							</p>
						</div>

						<div>
							<h3>
								<span>2</span> Book your trip
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
								<span>3</span> Hit the road
							</h3>
							<p>
								Have the car delivered or pick it up from your
								host. Check in with the app, grab the keys, and
								hit the road!
							</p>
						</div>
					</div>
					<img src="hand.jpg" alt="" />
				</div>
			</div>
		</div>
	);
}

export default HowCarRentalWorks;
