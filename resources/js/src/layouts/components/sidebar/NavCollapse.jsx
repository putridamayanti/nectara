import React from "react";
import {Collapse, ListItemButton, ListItemIcon, ListItemText, styled, useTheme} from "@mui/material";
import {KeyboardArrowDownRounded, KeyboardArrowUpRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import NavItem from "./NavItem.jsx";
import {usePage} from "@inertiajs/inertia-react";

const NavCollapse = (props) => {
    const {
        menu,
        level,
        pathWithoutLastPart,
        pathDirect,
        hideMenu,
        onClick,
    } = props;
    const page  = usePage();
    const role = page?.props?.profile?.role;
    const permissions = role?.permissions?.map(e => e.permission_id) ?? [];
    const Icon = menu?.icon;
    const theme = useTheme();
    const pathname = window.location.pathname;
    const [open, setOpen] = useState(true);
    const menuIcon =
        level > 1 ? (
            <Icon stroke={1.5} size="1rem" />
        ) : (
            <Icon sx={{ fontSize: 18 }} />
        );

    const handleClick = () => {
        setOpen(!open);
    };

    // menu collapse for sub-levels
    useEffect(() => {
        setOpen(false);
        menu?.children?.forEach((item) => {
            if (item?.href === pathname.replace('/app/[slug]', '')) {
                setOpen(true);
            }
        });
    }, [pathname, menu.children]);

    const ListItemStyled = styled(ListItemButton)(() => ({
        marginBottom: "2px",
        padding: "8px 10px",
        paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
        backgroundColor: open && level < 2 ? theme.palette.primary.main : "",
        whiteSpace: "nowrap",
        "&:hover": {
            backgroundColor:
                pathname.includes(menu.href) || open
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
            color:
                pathname.includes(menu.href) || open
                    ? "white"
                    : theme.palette.primary.main,
            '.MuiTypography-root': {
                color: pathname.includes(menu.href) || open
                    ? "white"
                    : theme.palette.primary.main,
            }
        },
        color:
            open && level < 2
                ? "white"
                : `inherit` && level > 1 && open
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
        borderRadius: 10,
        '.MuiTypography-root': {
            color: pathname.includes(menu.href) || open
                ? `white !important`
                : theme.palette.text.secondary,
        }
    }));
    // If Menu has Children
    const submenus = menu.children?.map((item) => {
        if (!role?.is_admin && item?.permissions && !item.permissions?.some(val => permissions.includes(val))) {
            return null;
        }

        if (item.children) {
            return (
                <NavCollapse
                    key={item?.id}
                    menu={item}
                    level={level + 1}
                    pathWithoutLastPart={pathWithoutLastPart}
                    pathDirect={pathDirect}
                    hideMenu={hideMenu}
                    onClick={onClick}
                />
            );
        } else {
            return (
                <NavItem
                    key={item.id}
                    item={item}
                    level={level + 1}
                    pathDirect={pathDirect}
                    hideMenu={hideMenu}
                    onClick={onClick}
                />
            );
        }
    });

    return (
        <>
            <ListItemStyled
                onClick={handleClick}
                selected={pathWithoutLastPart === menu.href}
                key={menu?.id}
            >
                <ListItemIcon
                    sx={{
                        minWidth: "36px",
                        p: "3px 0",
                        marginRight: 1.5,
                        color: "inherit",
                    }}
                >
                    {menuIcon}
                </ListItemIcon>
                <ListItemText color="inherit">
                    {hideMenu ? "" : <>{menu.title}</>}
                </ListItemText>
                {!open ? (
                    <KeyboardArrowDownRounded sx={{ fontSize: 18 }} />
                ) : (
                    <KeyboardArrowUpRounded sx={{ fontSize: 18 }} />
                )}
            </ListItemStyled>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {submenus}
            </Collapse>
        </>
    );
};

export default NavCollapse;
