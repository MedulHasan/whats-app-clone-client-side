import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import "./FriendScreen.css";
import useAuth from "../../../hooks/useAuth";

const FriendScreen = () => {
    const { user } = useAuth();
    const { state } = useLocation();
    const [message, setMessage] = useState([]);
    const [msg, setMsg] = useState([]);
    const textRef = useRef(null);

    console.log(msg);

    useEffect(() => {
        fetch(`http://localhost:8888/displayMessage/${state.conversation._id}`)
            .then((res) => res.json())
            .then((msg) => setMsg(msg.reverse()));
    }, [msg, state.conversation._id]);

    const handleSend = (e) => {
        e.preventDefault();
        let allMsg = [...message];
        allMsg.unshift(textRef.current.value);
        setMessage(allMsg);

        const textDetails = {
            conversationId: state.conversation._id,
            text: textRef.current.value,
            sender:
                state.conversation.creator.email === user.email
                    ? {
                          email: state.conversation.creator.email,
                          name: state.conversation.creator.fullName,
                          imageURL: state.conversation.creator.imageURL,
                      }
                    : {
                          email: state.conversation.participant.email,
                          name: state.conversation.participant.fullName,
                          imageURL: state.conversation.participant.imageURL,
                      },
            receiver:
                state.conversation.creator.email === user.email
                    ? {
                          email: state.conversation.participant.email,
                          name: state.conversation.participant.fullName,
                          imageURL: state.conversation.participant.imageURL,
                      }
                    : {
                          email: state.conversation.creator.email,
                          name: state.conversation.creator.fullName,
                          imageURL: state.conversation.creator.imageURL,
                      },
        };
        fetch("http://localhost:8888/storeConversation", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(textDetails),
        });
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
                        {/* last seen today at 12.00PM */}
                    </Typography>
                </Box>
            </Box>
            <Box className='chat-container-box'>
                {msg.length > 0 &&
                    msg.map((m) => (
                        <Box className='single-msg-cont'>
                            {m.sender.email !== user.email && (
                                <img
                                    className='receiver-image'
                                    src={m.sender.imageURL}
                                    alt=''
                                />
                            )}
                            <Typography
                                key={m._id}
                                className={
                                    m.sender.email === user.email
                                        ? "my-message"
                                        : "other-message"
                                }
                            >
                                {m.text}
                            </Typography>
                        </Box>
                    ))}
            </Box>
            <Box className='text-field-cont'>
                <GrEmoji />
                <form onSubmit={handleSend} className='input-form'>
                    <input
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
