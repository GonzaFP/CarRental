// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC8Exkb0gNyQF1Eat46aqxtJ5b1C27rf30",
	authDomain: "fir-auth-62ac5.firebaseapp.com",
	projectId: "fir-auth-62ac5",
	storageBucket: "fir-auth-62ac5.appspot.com",
	messagingSenderId: "223259993191",
	appId: "1:223259993191:web:b76b3032d7a8ce526160c2",
	measurementId: "G-NX3K6YBWDH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
