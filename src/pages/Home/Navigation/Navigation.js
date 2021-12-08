import { CircularProgress } from "@mui/material";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import AddFriend from "../AddFriend/AddFriend";
import ConversationList from "../ConversationList/ConversationList";
import Settings from "../Settings/Settings";
import "./Navigation.css";

const Navigation = () => {
    const { user } = useAuth();

    if (!user.photoURL) {
        return <CircularProgress />;
    }
    return (
        <div className='navigation-container'>
            <div className='navigation'>
                <img
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                    }}
                    src={user.photoURL}
                    alt='img'
                />
                <h3>{user.displayName}</h3>
                <div>
                    <div style={{ display: "flex" }}>
                        <AddFriend />
                        <Settings />
                    </div>
                </div>
            </div>
            <ConversationList />
        </div>
    );
};

export default Navigation;
