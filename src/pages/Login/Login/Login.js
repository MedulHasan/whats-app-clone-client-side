import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

import icon from "../../../image/whatsapp-square-brands.svg";
import banner from "../../../image/3D_Square_with_WhatsApp_Logo.png";
import "./Login.css";
import Registration from "../Registration/Registration";

const Login = () => {
    const [open, setOpen] = React.useState(false);

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
                <form className='login-form'>
                    <TextField
                        label='email@example.com'
                        id='outlined-size-small'
                        size='small'
                    />
                    <TextField
                        type='password'
                        label='password'
                        id='outlined-size-small'
                        size='small'
                    />
                    <Button variant='text' sx={{ mr: "auto" }}>
                        Forget Password?
                    </Button>
                    <Button type='submit' variant='contained'>
                        Login
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
                <Button sx={{ mt: 2 }} type='submit' variant='outlined'>
                    Google Sign In
                </Button>
            </Box>

            {/* registration */}
            <Registration open={open} setOpen={setOpen} />
        </div>
    );
};

export default Login;
