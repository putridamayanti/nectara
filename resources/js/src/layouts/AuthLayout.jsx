import React from "react";
import MainLayout from "./MainLayout";
import {Box} from "@mui/material";

const AuthLayout = ({ children }) => {
    return (
        <MainLayout>
            <Box sx={{
                width: '100vw',
                height: '100%',
                position: 'relative'
            }}>
                <img
                    src="/images/background.svg"
                    alt="background"
                    style={{
                        width: '100vw',
                        position: 'fixed',
                        objectFit: 'cover'
                    }}/>
                <Box sx={{ zIndex: 2, position: 'relative' }}>
                    {children}
                </Box>
            </Box>
        </MainLayout>
    )
};

export default AuthLayout;
