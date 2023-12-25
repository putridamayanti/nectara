import React from "react";
import AppNavbar from "./components/navbar/AppNavbar";
import {Box, styled} from "@mui/material";
import AppSidebar from "./components/sidebar/AppSidebar.jsx";

const MainWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    background: theme.palette.background.paper
}));

const PageWrapper = styled(Box)(() => ({
    display: "flex",
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: "60px",
    flexDirection: "column",
    zIndex: 1,
    width: 'calc(100vw - 300px)',
    backgroundColor: "transparent",
}));

const AppLayout = ({ children }) => {
    return (
        <MainWrapper>
            <AppSidebar/>
            <PageWrapper>
                <AppNavbar/>
                <Box sx={{ padding: { xs: '2rem 1rem', lg: '3rem 2rem'} }}>
                    {children}
                </Box>
            </PageWrapper>
        </MainWrapper>
    )
};

export default AppLayout;
