import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
} from "@mui/material";

import icon from "../../../image/whatsapp-square-brands.svg";
import banner from "../../../image/3D_Square_with_WhatsApp_Logo.png";
import "./Login.css";
import Registration from "../Registration/Registration";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithEmailAndPassword, loginUsingGoogle, isLoading } =
        useAuth();
    const [open, setOpen] = React.useState(false);
    const [loginUser, setLoginUser] = useState({});

    const handleGoogleLogin = () => {
        loginUsingGoogle(location, navigate);
    };

    const handleLoginUser = (e) => {
        const newUser = { ...loginUser };
        newUser[e.target.name] = e.target.value;
        setLoginUser(newUser);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginWithEmailAndPassword(
            loginUser.email,
            loginUser.password,
            location,
            navigate
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <div className='login-container'>
            <Box>
                <img src={banner} alt='' />
            </Box>
            <Box className='login-form-container'>
                <img width='100px' src={icon} alt='' />
                <Typography sx={{ mb: 3 }} variant='h4'>
                    Login Your account
                </Typography>
                <form onSubmit={handleSubmit} className='login-form'>
                    <TextField
                        label='email@example.com'
                        size='small'
                        name='email'
                        onBlur={handleLoginUser}
                    />
                    <TextField
                        type='password'
                        label='password'
                        size='small'
                        name='password'
                        onBlur={handleLoginUser}
                    />
                    <Button variant='text' sx={{ mr: "auto" }}>
                        Forget Password?
                    </Button>
                    <Button type='submit' variant='contained'>
                        {isLoading ? (
                            <CircularProgress style={{ color: "#fff" }} />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </form>
                <Button
                    variant='text'
                    sx={{ mr: "auto" }}
                    onClick={handleClickOpen}
                >
                    New User?
                </Button>
                <div className='hr-or'>
                    <hr /> <Typography variant='h6'>OR</Typography> <hr />
                </div>
                <Button
                    onClick={handleGoogleLogin}
                    sx={{ mt: 2 }}
                    type='submit'
                    variant='outlined'
                >
                    Google Sign In
                </Button>
            </Box>

            {/* registration */}
            <Registration open={open} setOpen={setOpen} />
        </div>
    );
};

export default Login;
