import { useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from "firebase/auth";
import InitializeAuthentication from "../firebase/firebase.init";
// import { storage } from "../firebase/firebase.init";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router";

InitializeAuthentication();

const useFirebase = () => {
    const navigate = useNavigate();
    const storage = getStorage();
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // register a new user using email and password
    const registrationWithEmailAndPassword = (
        email,
        password,
        firstName,
        lastName,
        image,
        navigate
    ) => {
        setIsLoading(true);
        const fullName = firstName.concat(" ", lastName);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // file upload
                const storageRef = ref(storage, `users/${image.name}`);
                const uploadTask = uploadBytesResumable(storageRef, image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                // save to state
                                const newUser = {
                                    email,
                                    displayName: fullName,
                                    photoURL: downloadURL,
                                };
                                setUser(newUser);
                                // save to database
                                saveUserDB(
                                    fullName,
                                    email,
                                    downloadURL,
                                    "POST"
                                );
                                // update profile
                                updateProfile(auth.currentUser, {
                                    displayName: fullName,
                                    photoURL: downloadURL,
                                });
                            }
                        );
                    }
                );
                // file upload
                navigate("/home");
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    // login a user using email and password
    const loginWithEmailAndPassword = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || "/home";
                navigate(destination);
            })
            .catch((error) => {
                console.log(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    // login using google
    const loginUsingGoogle = (location) => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                if (user.email) {
                    saveUserDB(
                        user.displayName,
                        user.email,
                        user.photoURL,
                        "PUT"
                    );
                    const destination = location?.state?.from || "/home";
                    navigate(destination);
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // authentication state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    // sign out user
    const logout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    };

    // new user saved to database
    const saveUserDB = (fullName, email, imageURL, method) => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("imageURL", imageURL);
        fetch("http://localhost:8888/user", {
            method,
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {});
    };

    // return all variable or function
    return {
        user,
        isLoading,
        registrationWithEmailAndPassword,
        loginWithEmailAndPassword,
        loginUsingGoogle,
        logout,
    };
};

export default useFirebase;
