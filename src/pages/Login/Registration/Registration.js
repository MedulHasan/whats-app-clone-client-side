import React from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const Registration = ({ open, setOpen }) => {
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
                    Modal title
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
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum.
                    </Typography>
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
};

export default Registration;
