import React from "react";
import {AppBar, Button, Stack, styled, Toolbar} from "@mui/material";
import Logo from "../Logo.jsx";
import {useSelector} from "react-redux";
import {Link} from "@inertiajs/react";

const MainNavbar = () => {
    const themeSetting = useSelector(state => state.theme);

    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        background: theme.palette.background.default,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',

        [theme.breakpoints.up('lg')]: {
            minHeight: themeSetting.toolbarHeight,
        },
    }));

    const ToolbarStyled = styled(Toolbar)(({theme}) => ({
        margin: '0 auto',
        width: '100%',
        color: `${theme.palette.text.secondary} !important`,
    }));

    return (
        <AppBarStyled position="sticky" color="default" elevation={0}>
            <ToolbarStyled sx={{ maxWidth: 'lg' }}>
                <Logo/>
            </ToolbarStyled>
        </AppBarStyled>
    )
};

export default MainNavbar;
