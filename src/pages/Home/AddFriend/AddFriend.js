import React, { useEffect, useState } from "react";
import { Menu, MenuItem, IconButton, Typography, Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import "./AddFriend.css";
import useAuth from "../../../hooks/useAuth";

const AddFriend = () => {
    const { user } = useAuth();
    const [allUsers, setAllUsers] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const addToChat = (email, fullName, imageURL) => {
        const chat = {
            creator: {
                email: user.email,
                fullName: user.displayName,
                imageURL: user.photoURL,
            },
            participant: {
                email,
                fullName,
                imageURL,
            },
        };
        fetch(`http://localhost:8888/createConversation`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(chat),
        });
        handleClose();
    };

    useEffect(() => {
        fetch(`http://localhost:8888/users`)
            .then((res) => res.json())
            .then((users) => {
                setAllUsers(users);
            });
    }, [user]);
    return (
        <div>
            <IconButton size='large' color='inherit' onClick={handleMenu}>
                <AiOutlinePlus />
            </IconButton>
            <Menu
                sx={{ mt: 5 }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {allUsers
                    .filter((users) => users.email !== user.email)
                    .map((user) => (
                        <MenuItem key={user._id} className='add-user'>
                            <img
                                className='friend-image'
                                src={user.imageURL}
                                alt=''
                            />
                            <Typography sx={{ ml: 3 }}>
                                {user.fullName}
                            </Typography>
                            <Button
                                onClick={() =>
                                    addToChat(
                                        user.email,
                                        user.fullName,
                                        user.imageURL
                                    )
                                }
                                sx={{ ml: 3 }}
                                variant='outlined'
                                size='small'
                            >
                                Add to Chat
                            </Button>
                        </MenuItem>
                    ))}
            </Menu>
        </div>
    );
};

export default AddFriend;
