import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router";
import "./FriendScreen.css";

const FriendScreen = () => {
    const { state } = useLocation();
    console.log(state);
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
        </div>
    );
};

export default FriendScreen;
