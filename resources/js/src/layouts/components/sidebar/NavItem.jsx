import React from "react";
import {List, ListItemButton, ListItemIcon, ListItemText, styled, Typography, useTheme} from "@mui/material";
import {CircleOutlined} from "@mui/icons-material";
import {Link} from "@inertiajs/inertia-react";

const NavItem = ({ item, level, pathDirect, hideMenu }) => {
    const Icon = item?.icon;
    const theme = useTheme();
    let baseHref = '/app';

    const itemIcon =
        level > 1 ? (
            <CircleOutlined sx={{ fontSize: 8 }}/>
        ) : (
            <Icon sx={{ fontSize: 18 }} />
        );

    const ListItemStyled = styled(ListItemButton)(() => ({
        whiteSpace: "nowrap",
        marginBottom: "2px",
        padding: "8px 10px",
        borderRadius: 10,
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        color:
            level > 1 && pathDirect === item?.href
                ? `${theme.palette.primary.main}!important`
                : theme.palette.text.secondary,
        paddingLeft: hideMenu ? "10px" : level > 2 ? `${level * 15}px` : "10px",
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            '.MuiTypography-root': {
                color: theme.palette.primary.main
            }
        },
        "&.Mui-selected": {
            color: "white",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
            },
        },
        '.MuiTypography-root': {
            fontWeight: 600,
            color: pathDirect === item?.href
                    ? level > 1 ? theme.palette.primary.main : `white !important`
                    : theme.palette.text.secondary,
        }
    }));

    return (
        <List component="li" disablePadding key={item?.id && item.title}>
            <Link href={`${baseHref}${item.href}`}>
                <ListItemStyled
                    disabled={item?.disabled}
                    selected={pathDirect === item?.href}
                    // onClick={onClick}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: "36px",
                            p: "3px 0",
                            paddingLeft: level > 1 ? 1 : 0,
                            marginRight: 1.5,
                            color:
                                level > 1 && pathDirect === item?.href
                                    ? `${theme.palette.primary.main}!important`
                                    : "inherit",
                        }}
                    >
                        {itemIcon}
                    </ListItemIcon>
                    <ListItemText>
                        {hideMenu ? "" : <>{item?.title}</>}
                        <br />
                        {item?.subtitle ? (
                            <Typography variant="caption">
                                {hideMenu ? "" : item?.subtitle}
                            </Typography>
                        ) : (
                            ""
                        )}
                    </ListItemText>
                </ListItemStyled>
            </Link>
        </List>
    );
};

export default NavItem;
