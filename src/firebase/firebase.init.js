import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./firebase.config";

const firebaseApp = initializeApp(firebaseConfig);
// export const storage = getStorage(firebaseApp);

const InitializeAuthentication = () => {
    return firebaseApp;
};

export default InitializeAuthentication;
