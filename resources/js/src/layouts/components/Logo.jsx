import React from "react";
import {Stack, useMediaQuery, useTheme} from "@mui/material";
import {useSelector} from "react-redux";

const Logo = () => {
    const themeSetting = useSelector((state) => state.theme);
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('lg'));
    const isMiniSidebar = themeSetting.isMiniSidebar;
    const logoSize = {
        width: smDown ? 120 : isMiniSidebar && !themeSetting.isMiniSidebarHover ? 40 : 160,
        height: smDown ? 40 : isMiniSidebar && !themeSetting.isMiniSidebarHover ? 40 : 60
    };
    const logo = isMiniSidebar && !themeSetting.isMiniSidebarHover ? '/images/logo/logo-icon.svg' : '/images/logo/logo.svg';

    return (
        <Stack marginTop={2} justifyContent="center" alignItems="center">
            <img src={logo} alt="logo" width={logoSize.width} height={logoSize.height}/>
        </Stack>
    )
};

export default Logo;
