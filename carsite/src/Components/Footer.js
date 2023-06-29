import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import {
	GooglePlayButton,
	ButtonsContainer,
	AppStoreButton,
} from "react-mobile-app-button";
import "./Styles/Footer.css";

function Footer() {
	const APKUrl =
		"https://play.google.com/store/apps/details?id=host.exp.exponent";
	const AppStore = "https://www.apple.com/app-store/";
	return (
		<div className="footer">
			<div className="first">
				<div className="company flexitems">
					<h4>Car Rental</h4>
					<p>About</p>
					<p>Team</p>
					<p>Policies</p>
					<p>Careers</p>
				</div>

				<div className="location flexitems">
					<h4>Locations</h4>
					<p>USA</p>
					<p>Australia</p>
					<p>Canada(EN)</p>
					<p>Canada(FR)</p>
					<p>UK</p>
				</div>

				<div className="explore flexitems">
					<h4>Book a car</h4>
					<p>Weddings</p>
					<p>Trust and safety</p>
					<p>Sustainability</p>
					<p>FAQs</p>
				</div>

				<div className="hosting flexitems">
					<h4>Hosting</h4>
					<p>List your car</p>
					<p>Calculator</p>
					<p>All star hosts</p>
					<p>Host tools</p>
					<p>FAQs</p>
				</div>

				<div className="social flexitems">
					<div className="socialicons">
						<FaFacebook className="icons" />
						<FaInstagram className="icons" />
						<FaTwitter className="icons" />
						<FaYoutube className="icons" />
					</div>
					<div>
						<ButtonsContainer direction="column">
							<GooglePlayButton
								url={APKUrl}
								theme={"dark"}
								width="160px"
								height="20px"
								className="Btn"
							/>

							<AppStoreButton
								url={AppStore}
								theme={"dark"}
								width="150px"
								height="20px"
								className="Btn"
							/>
						</ButtonsContainer>
					</div>
				</div>
			</div>

			<div className="sec">
				<div className="types flexitems">
					<h4>Vehicle Types</h4>
					<p>Trucks</p>
					<p>Vans</p>
					<p>Exotic & Luxury</p>
					<p>Convertibles</p>
					<p>Classics</p>
					<p>Electric Vehicles</p>
				</div>

				<div className="makes flexitems">
					<h4>Makes</h4>
					<p>Tesla</p>
					<p>Lamborghini</p>
					<p>Jeep</p>
					<p>Rolls Royce</p>
					<p>Mercedes Benz</p>
					<p>Ferrari</p>
				</div>

				<div className="city flexitems">
					<h4>Top cities</h4>
					<div className="cities">
						<div className="group1">
							<p>Atlanta</p>
							<p>Austin</p>
							<p>Chicago</p>
							<p>London</p>
							<p>Seattle</p>
							<p>Sydney</p>
						</div>

						<div className="group2">
							<p>Portland</p>
							<p>Sacramento</p>
							<p>San Francisco</p>
							<p>Toronto</p>
							<p>Vancouver</p>
							<p>Washington DC</p>
						</div>
					</div>
				</div>
			</div>

			<p id="copy">&copy; 2023 Car Rental All Rights Reserved</p>
		</div>
	);
}

export default Footer;
