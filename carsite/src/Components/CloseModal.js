import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function CloseModal({ closeModal }) {
	return (
		<div className="closeBg">
			<div className="title">
				<ClearOutlinedIcon
					onClick={() => {
						closeModal(false);
					}}
					className="closeIcon"
				/>
				<h1>Closing your account?</h1>
				<h3>What that means</h3>
			</div>
			<div className="body">
				<p>
					We hate to see you go. Are you sure you want to close your
					account? Please be advised if you choose to proceed, your
					account closure will be irreversible.
				</p>
				<ul>
					<li>
						You will no longer be able to book trips or list your
						car.
					</li>
					<li>Your vehicle listing(s) will be deleted.</li>
					<li>
						Any information associated with your account will not be
						publically viewable on our website and apps.
					</li>
					<li>
						Any booked or pending trips will be cancelled
						immediately.
					</li>
					<li>
						You will no longer be able to login to your account.
					</li>
				</ul>
			</div>
			<div className="footerBtns">
				<button
					className=" updateBtns "
					id="cancelClose"
					onClick={() => closeModal(false)}>
					Cancel
				</button>
				<button className="purpleBtn">Continue</button>
			</div>
		</div>
	);
}

export default CloseModal;
