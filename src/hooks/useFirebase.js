import { useEffect, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    signOut,
} from "firebase/auth";
import InitializeAuthentication from "../firebase/firebase.init";

InitializeAuthentication();

const useFirebase = () => {
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
                const newUser = {
                    email,
                    displayName: fullName,
                };
                setUser(newUser);
                saveUserDB(fullName, email, password, image, "POST");
                updateProfile(auth.currentUser, {
                    displayName: fullName,
                });
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
    }, []);

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
    const saveUserDB = (fullName, email, password, image, method) => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);
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
        logout,
    };
};

export default useFirebase;
