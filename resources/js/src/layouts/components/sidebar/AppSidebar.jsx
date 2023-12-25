import React from "react";
import {Box, Drawer, useMediaQuery, useTheme} from "@mui/material";
import Logo from "../Logo.jsx";
import {useDispatch, useSelector} from "../../../store";
import {setSidebarCollapse} from "../../../store/slices/ThemeSlice";
import SidebarItems from "./SidebarItems.jsx";

const AppSidebar = () => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const themeSetting = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const theme = useTheme();
    const toggleWidth = themeSetting.isSidebarCollapse ? 0 : themeSetting.sidebarWidth;

    {/* ------------------------------------------- */}
    {/* AppSidebar for desktop */}
    {/* ------------------------------------------- */}
    if (lgUp) {
        return (
            <Box
                sx={{
                    width: toggleWidth,
                    flexShrink: 0,
                    // ...(themeSetting.isMiniSidebar && {
                    //     position: 'absolute',
                    // }),
                }}
            >
                <Drawer
                    anchor="left"
                    open={themeSetting.isSidebarCollapse}
                    variant="permanent"
                    PaperProps={{
                        sx: {
                            background: 'transparent',
                            transition: theme.transitions.create('width', {
                                duration: theme.transitions.duration.shortest,
                            }),
                            width: toggleWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    <Box
                        sx={{
                            maxHeight: '100vh',
                        }}>
                        <Logo />
                        <SidebarItems />
                    </Box>
                </Drawer>
            </Box>
        );
    }

    {/* ------------------------------------------- */}
    {/* AppSidebar for mobile */}
    {/* ------------------------------------------- */}
    return (
        <Drawer
            anchor="left"
            open={themeSetting.isSidebarCollapse}
            onClose={() => dispatch(setSidebarCollapse())}
            variant="temporary"
            PaperProps={{
                sx: {
                    width: themeSetting.sidebarWidth,
                    background: theme.palette.background.default,

                    // backgroundColor:
                    //   customizer.activeMode === 'dark'
                    //     ? customizer.darkBackground900
                    //     : customizer.activeSidebarBg,
                    // color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
                    border: '0 !important',
                    boxShadow: (theme) => theme.shadows[8],
                },
            }}
        >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={2}>
                <Logo />
            </Box>
            {/* ------------------------------------------- */}
            {/* AppSidebar For Mobile */}
            {/* ------------------------------------------- */}
            <SidebarItems />
        </Drawer>
    );
};

export default AppSidebar;
