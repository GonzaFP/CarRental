import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./Styles/PriceDetails.css";

function PriceDetails({ setClose, price }) {
	return (
		<div className="priceDetailsContainer">
			<div className="priceDetails">
				<MdClear id="clear" onClick={() => setClose(false)} />
				<h2>Price details</h2>
				<div className="priceBody">
					<h4>Included</h4>
					<div className="baseprice tripfee">
						<AiOutlineCheck id="tick" />
						<h5>&pound; {price} &times; 3 days</h5>
						<h5 id="total">&pound; 285</h5>
					</div>
					<div className="tripprice tripfee">
						<div className="totalprice">
							<h5>Est. trip total</h5>
							<h5 id="est">&pound; 285</h5>
						</div>
						<h5>Not yet included (applied at checkout)</h5>
					</div>
					<div className="protectionPlan tripfee">
						<h5>Protection plan</h5>
						<p>
							Includes liability insurance and physical damage
							protection options; you’ll select a plan when you’re
							checking out
						</p>
					</div>
					<div className="tripfee">
						<h5>Trip fee</h5>
						<p>This helps us run the CarRental platform.</p>
					</div>
				</div>
				<div className="fee">
					<h5>Young driver fee</h5>
					<p>Applies to all drivers under 25 years old.</p>
				</div>
			</div>
		</div>
	);
}

export default PriceDetails;
