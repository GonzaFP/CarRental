import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { deleteObject, listAll, ref } from "firebase/storage";
import { auth, db, storage } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { deleteUser } from "firebase/auth";
import {
	collection,
	deleteDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function CloseModal({ closeModal }) {
	const user = auth.currentUser;
	const navigate = useNavigate();

	const handleCloseAccount = () => {
		if (user) {
			// ! delete the user's profile photo from storage
			const listRef = ref(storage, `profilePhotos/${user.uid}`);
			listAll(listRef).then((response) => {
				response.items.forEach((itemRef) => {
					deleteObject(itemRef)
						.then(() => {
							console.log("picture deleted");
						})
						.catch((error) => {
							console.log("delete error", error.code);
						});
				});
			});

			// ! delete the user
			deleteUser(user)
				.then(() => {
					console.log("user auth deleted");
				})
				.catch((error) => {
					console.log("sorry error", error.code);
				});

			// !delete user from database

			const docQuery = query(
				collection(db, "users"),
				where("user.id", "==", user.uid)
			);
			getDocs(docQuery).then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					deleteDoc(doc.ref)
						.then(() => {
							console.log("user deleted from db");
						})
						.catch((error) => {
							console.log("error occured", error.code);
						});
				});
			});
		}
		closeModal(false);
	};
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
				<button className="purpleBtn" onClick={handleCloseAccount}>
					Continue
				</button>
			</div>
		</div>
	);
}

export default CloseModal;
