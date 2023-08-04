import React from "react";
import "./Styles/List.css";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

function ListCar() {
	const navigate = useNavigate();
	return (
		<section className="listCarSection">
			<div className="ListContainer">
				<div className="type">
					<h1>
						Let your car work while you
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
										.typeString(
											"finally take that vacation."
										)
										.pauseFor(1000)
										.start();
								}}
							/>
						</span>
					</h1>
				</div>
				<h5>Share your car.</h5>
				<div className="started">
					<button onClick={() => navigate("/signin")}>
						Get started
					</button>
				</div>

				<img src="safari.jpg" alt="" />
			</div>
		</section>
	);
}

export default ListCar;
