import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { IoIosMore } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";

const Settings = () => {
    const { logout } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton size='large' onClick={handleMenu} color='inherit'>
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
    );
};

export default Settings;
