import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import MobilePhone from "./MobilePhone";
function Approved() {
	return (
		<div className="approved">
			<h1>Get approved to drive</h1>
			<div>
				<h4>Verify your email</h4>
				<span>
					<BsCheckCircle />
				</span>
			</div>
			<div>
				<h4>Profile photo</h4>
				Please provide a clear photo of your face so your hosts can
				recognize you. Continue
				<button>Upload photo</button>
			</div>

			<div>
				<MobilePhone />
			</div>
		</div>
	);
}

export default Approved;
