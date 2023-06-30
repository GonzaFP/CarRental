import React from "react";
import "./Styles/List.css";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

function ListCar() {
	const navigate = useNavigate();
	return (
		<div className="ListContainer">
			<div className="type">
				<span>Let your car work while you</span>{" "}
				<span>
					<Typewriter
						onInit={(typewriter) => {
							typewriter
								.typeString("binge watch and chill.")
								.pauseFor(1000)
								.deleteAll()
								.typeString("work 9 to 5.")
								.pauseFor(1000)
								.deleteAll()
								.typeString("go fishing.")
								.pauseFor(1000)
								.deleteAll()
								.typeString("finally take that vacation.")
								.pauseFor(1000)
								.start();
						}}
					/>
				</span>
			</div>
			<h3>
				Share your car whenever you're not using it and earn over £400
				per month per car on CarRental, the world's largest car sharing
				marketplace.
			</h3>
			<div className="started">
				<button onClick={() => navigate("/signin")}>Get started</button>
			</div>

			<img src="safari.jpg" alt="" />
		</div>
	);
}

export default ListCar;
