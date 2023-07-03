import { useState } from "react";
import "./Styles/FAQ.css";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function FAQ(props) {
	console.log(props);
	const { question, answer } = props.item;
	const className = props.className;
	const [toggle, setToggle] = useState(false);

	const handleDisplay = () => {
		setToggle(!toggle);
	};
	return (
		<div className="FAQ">
			<div className={`${className} questions`}>
				<div className="question" onClick={handleDisplay}>
					<div className="title">{question}</div>
					{toggle && (
						<div className="arrow">
							<MdOutlineKeyboardArrowUp />
						</div>
					)}
					{!toggle && (
						<div className="arrow">
							<MdOutlineKeyboardArrowDown />
						</div>
					)}
				</div>

				{toggle && <div className="answer"> {answer} </div>}
			</div>
		</div>
	);
}

export default FAQ;
