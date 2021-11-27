import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import useAuth from "../../../hooks/useAuth";
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

    /* if (!user.displayName) {
        return <CircularProgress />;
    } */
    return (
        <div className='navigation'>
            <img src='' alt='img' />
            <p>name: {user.displayName}</p>
            <div>
                <AiOutlinePlus />
                <div>
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
