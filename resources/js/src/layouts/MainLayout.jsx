import React from "react";
import MainNavbar from "./components/navbar/MainNavbar.jsx";
import {Box, styled} from "@mui/material";

const MainLayout = ({ children }) => {
    const ContainerStyled = styled(Box)(({ theme }) => ({
        minWidth: '100%',
        minHeight: '100vh',
        background: theme.palette.background.default
    }));

    return (
        <>
            <MainNavbar/>
            <ContainerStyled>
                { children }
            </ContainerStyled>
        </>
    )
};

export default MainLayout;
