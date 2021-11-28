import { IconButton, Menu, MenuItem, CircularProgress } from "@mui/material";
import React from "react";
import { IoIosMore } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
import AddFriend from "../AddFriend/AddFriend";
import "./Navigation.css";

const Navigation = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user.photoURL) {
        return <CircularProgress />;
    }
    return (
        <div className='navigation'>
            <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src={user.photoURL}
                alt='img'
            />
            <div>
                <div style={{ display: "flex" }}>
                    <AddFriend />
                    <IconButton
                        size='large'
                        onClick={handleMenu}
                        color='inherit'
                    >
                        <IoIosMore />
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
                        <MenuItem onClick={handleClose}>Setting</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
