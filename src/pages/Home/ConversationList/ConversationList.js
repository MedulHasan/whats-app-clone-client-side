import { Typography as p } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import "./ConversationList.css";

const ConversationList = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8888/conversation/${user.email}`)
            .then((res) => res.json())
            .then((data) => setConversations(data));
    }, [conversations, user.email]);
    return (
        <div className='conversation-list'>
            {conversations.length > 0 &&
                conversations.map((conversation) => (
                    <div key={conversation._id} className='conversation-cont'>
                        <img
                            className='participant-image'
                            src={conversation.participant.imageURL}
                            alt=''
                        />
                        <Box>
                            <p className='participant-name'>
                                {conversation.participant.fullName}
                            </p>
                            <p className='participant-text'>Text Here</p>
                        </Box>
                    </div>
                ))}
        </div>
    );
};

export default ConversationList;
