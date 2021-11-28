import React, { useEffect, useState } from "react";
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    SwipeableDrawer,
    IconButton,
} from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";

const AddFriend = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [state, setState] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8888/users")
            .then((res) => res.json())
            .then((users) => {
                setAllUsers(users);
            });
    }, []);

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setState(open);
    };

    console.log(allUsers);
    const list = () => (
        <Box
            style={{ width: "300px" }}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {allUsers.email &&
                    allUsers.map((user) => (
                        <ListItem button key={user._id}>
                            <ListItemText primary={user.email} />
                        </ListItem>
                    ))}
            </List>
            {/* <Divider /> */}
        </Box>
    );
    return (
        <div>
            <IconButton
                size='large'
                onClick={toggleDrawer(true)}
                color='inherit'
            >
                <AiOutlinePlus style={{ marginRight: "5px" }} />
            </IconButton>
            <SwipeableDrawer
                anchor='left'
                open={state}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                {list()}
            </SwipeableDrawer>
        </div>
    );
};

export default AddFriend;
