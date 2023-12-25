import {Box, Card, CardContent, Typography} from "@mui/material";
import LoginForm from "../src/components/pages/auth/LoginForm.jsx";
import React from "react";
import InstallForm from "../src/components/pages/setting/InstallForm.jsx";

export default function Install() {
    return (
        <Box sx={{
            height: 'calc(100vh - 100px)',
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Card sx={{ minWidth: '25%' }}>
                <CardContent>
                    <Box height={40}/>
                    <Typography sx={{ textAlign: 'center' }} variant="h4">SETUP</Typography>
                    <Box height={40}/>
                    <InstallForm/>
                    <Box height={40}/>
                </CardContent>
            </Card>
        </Box>
    )
}
