import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const InitializeAuthentication = () => {
    return initializeApp(firebaseConfig);
};

export default InitializeAuthentication;
