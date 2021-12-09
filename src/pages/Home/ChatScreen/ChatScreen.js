import React from "react";
import "./ChatScreen.css";
import home from "../../../image/home.jpg";
import { Typography } from "@mui/material";

const ChatScreen = () => {
    return (
        <div className='chat-screen-container'>
            <img className='banner-image' src={home} alt='' />
            <Typography className='home-text'>
                Keep Your Connection with WhatsApp
            </Typography>
        </div>
    );
};

export default ChatScreen;
