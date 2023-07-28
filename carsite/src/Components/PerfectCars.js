import React from "react";
import "./Styles/Perfect.css";
import { useNavigate } from "react-router-dom";

function PerfectCars() {
	const navigate = useNavigate();
	return (
		<section className="BrowseContainer">
			<div className="Browse">
				<div className="leftColumn">
					<h1>Find the perfect car to take on the great outdoors</h1>
					<h5>Premium Cars</h5>
					<p>
						Facilisi cras fermentum odio eu feugiat. In fermentum et
						sollicitudin ac ori accumsan sit amet nulla facilisi
						morbi tempus iaculis urna id. Aenean euismod elementum
						nisi quis eleifend quam adipiscing vitae dipiscing.
					</p>
					<button onClick={() => navigate("/browsecars")}>
						Browse cars
					</button>
				</div>

				<div className="rightColumn">
					<img src="perfect1.jpg" alt="" />
					<img src="perfect2.jpg" alt="" />
				</div>
			</div>
		</section>
	);
}

export default PerfectCars;
