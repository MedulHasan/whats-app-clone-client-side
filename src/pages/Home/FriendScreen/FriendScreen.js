import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import "./FriendScreen.css";
import useAuth from "../../../hooks/useAuth";

const FriendScreen = () => {
    let key = 0;
    const { user } = useAuth();
    const { state } = useLocation();
    const [message, setMessage] = useState([]);
    const textRef = useRef(null);

    const handleSend = (e) => {
        e.preventDefault();
        let allMsg = [...message];
        allMsg.unshift(textRef.current.value);
        setMessage(allMsg);

        /* const textDetails = {
            conversationId: state.conversationId,
            text: textRef.current.value,
            sender: {
                email: state.creator.email,
                name: state.creator.fullName,
                imageURL: state.creator.imageURL,
            },
            receiver: {
                email: state.participant.email,
                name: state.participant.fullName,
                imageURL: state.participant.imageURL,
            },
        }; */
        // fetch("", {});
        e.target.reset();
    };
    return (
        <div className='friend-screen'>
            <Box className='friend-identity'>
                <img src={state.participant.imageURL} alt='' />
                <Box sx={{ ml: 2 }}>
                    <Typography className='friend-name'>
                        {state.participant.fullName}
                    </Typography>
                    <Typography className='last-seen'>
                        last seen today at 12.00PM
                    </Typography>
                </Box>
            </Box>
            <Box className='chat-container-box'>
                {message.length > 0 &&
                    message.map((msg) => (
                        <Typography key={key++} className='my-message'>
                            {msg}
                        </Typography>
                    ))}
            </Box>
            <Box className='text-field-cont'>
                <GrEmoji />
                <form onSubmit={handleSend} className='input-form'>
                    <input
                        // onBlur={handleMessage}
                        ref={textRef}
                        className='message-field'
                        type='text'
                        placeholder='write message....'
                    />
                    <button type='submit' className='send-button'>
                        <AiOutlineSend />
                    </button>
                </form>
            </Box>
        </div>
    );
};

export default FriendScreen;
