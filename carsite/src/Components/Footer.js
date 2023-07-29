import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

import "./Styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<section className="footerSection">
			<div className="footerContain">
				<div className="firstColumn">
					<h3>CarRental</h3>
					<p>
						Lorem ipsum is placeholder text commonly used in the
						graphic, print, and publishing industries for previewing
						layouts and visual mockups.
					</p>
					<p>
						<span id="callcenter">Call Center: +264 123 12 12</span>
					</p>
				</div>

				<div className="secondColumn">
					<div className="quickLinks">
						<h3 className="footerTitle">Quick links</h3>
						<div className="footerLinks">
							<Link to="/howworks">How we work</Link>
							<Link to="/host">Become a Host</Link>
							<Link to="/">FAQs</Link>
						</div>
					</div>

					<div className="contactUs">
						<h3 className="footerTitle">Contact us</h3>
						<FaFacebook className="footerIcons" />
						<FaTwitter className="footerIcons" />
						<FaInstagram className="footerIcons" />
						<FaYoutube className="footerIcons" />
					</div>
				</div>
			</div>
			<div className="copyright">
				<p>&copy; 2023 CarRental, All Rights Reserved.</p>
			</div>
		</section>
	);
}

export default Footer;
