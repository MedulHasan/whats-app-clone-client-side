import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    Input,
    CircularProgress,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Registration.css";
import icon from "../../../image/whatsapp-square-brands.svg";

import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const Registration = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { registrationWithEmailAndPassword, isLoading } = useAuth();
    const [registerData, setRegisterData] = useState({});
    const [image, setImage] = useState(null);
    const handleBlur = (e) => {
        const newData = { ...registerData };
        newData[e.target.name] = e.target.value;
        setRegisterData(newData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        registrationWithEmailAndPassword(
            registerData.email,
            registerData.password,
            registerData.firstName,
            registerData.lastName,
            image,
            navigate
        );
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby='customized-dialog-title'
                open={open}
            >
                <DialogTitle id='customized-dialog-title' onClose={handleClose}>
                    <Box style={{ textAlign: "center" }}>
                        <img width='100px' src={icon} alt='' />
                        <Typography sx={{ mb: 1 }} variant='h4'>
                            Register a New account
                        </Typography>
                    </Box>
                    <IconButton
                        aria-label='close'
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className='registration-container'>
                    <form onSubmit={handleSubmit} className='registration-form'>
                        <Box style={{ display: "flex", gap: "10px" }}>
                            <TextField
                                label='First Name'
                                name='firstName'
                                size='small'
                                onBlur={handleBlur}
                            />
                            <TextField
                                label='Last Name'
                                name='lastName'
                                size='small'
                                onBlur={handleBlur}
                            />
                        </Box>
                        <TextField
                            type='email'
                            label='email'
                            name='email'
                            size='small'
                            onBlur={handleBlur}
                        />
                        <TextField
                            type='password'
                            label='password'
                            name='password'
                            size='small'
                            onBlur={handleBlur}
                        />
                        <TextField
                            type='password'
                            label='confirm password'
                            name='confirm password'
                            size='small'
                            onBlur={handleBlur}
                        />
                        <Input
                            accept='image/*'
                            type='file'
                            name='image'
                            onChange={(e) => setImage(e.target.files[0])}
                            size='small'
                        />
                        <Button type='submit' variant='contained'>
                            {isLoading ? (
                                <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </form>
                    <Button variant='text' sx={{ mt: 2 }}>
                        Have an account?
                    </Button>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
};

export default Registration;
