import { Typography as p } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import "./ConversationList.css";

const ConversationList = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();

    const handleFriendWithChat = (participant, conversation) => {
        // console.log(conversation);
        navigate("/home/friendMessage", {
            state: { participant: participant, conversation: conversation },
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8888/conversation/${user.email}`)
            .then((res) => res.json())
            .then((data) => setConversations(data));
    }, [conversations, user.email]);
    return (
        <div className='conversation-list'>
            {conversations.length > 0 &&
                conversations.map((conversation) => (
                    <div key={conversation._id}>
                        {conversation.creator.email !== user.email ? (
                            <div
                                onClick={() =>
                                    handleFriendWithChat(
                                        user.email ===
                                            conversation.participant.email
                                            ? conversation.creator
                                            : conversation.participant,
                                        conversation
                                    )
                                }
                                className='conversation-cont'
                            >
                                <img
                                    className='participant-image'
                                    src={conversation.creator.imageURL}
                                    alt=''
                                />
                                <Box>
                                    <p className='participant-name'>
                                        {conversation.creator.fullName}
                                    </p>
                                    <p className='participant-text'>
                                        Text Here
                                    </p>
                                </Box>
                            </div>
                        ) : (
                            <div
                                onClick={() =>
                                    handleFriendWithChat(
                                        conversation.participant,
                                        conversation
                                    )
                                }
                                className='conversation-cont'
                            >
                                <img
                                    className='participant-image'
                                    src={conversation.participant.imageURL}
                                    alt=''
                                />
                                <Box>
                                    <p className='participant-name'>
                                        {conversation.participant.fullName}
                                    </p>
                                    <p className='participant-text'>
                                        Text Here
                                    </p>
                                </Box>
                            </div>
                        )}
                    </div>
                ))}
        </div>
    );
};

export default ConversationList;
