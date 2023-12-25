import React, {useState} from "react";
import {Avatar, Box, Button, Divider, IconButton, Menu, Stack, Typography} from "@mui/material";
import {MailRounded} from "@mui/icons-material";
import ProfileMenus from "../constants/profile.jsx";
import {Inertia} from "@inertiajs/inertia";
import {usePage, Link} from "@inertiajs/inertia-react";

const Profile = () => {
    const { props } = usePage();
    const [anchorEl2, setAnchorEl2] = useState(null);
    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const logout = () => {
        return Inertia.post('/logout');
    };

    return (
        <Box>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color="inherit"
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === 'object' && {
                        color: 'primary.main',
                    }),
                }}
                onClick={handleClick2}
            >
                <Avatar
                    src={"/images/avatar.svg"}
                    alt={'ProfileImg'}
                    sx={{
                        width: 35,
                        height: 35,
                    }}
                />
            </IconButton>
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{
                    '& .MuiMenu-paper': {
                        width: '360px',
                        p: 4,
                    },
                }}
            >
                <Typography variant="h5">User Profile</Typography>
                <Stack direction="row" py={3} spacing={2} alignItems="center">
                    <Avatar
                        src={"/images/avatar.svg"}
                        alt={"ProfileImg"}
                        sx={{ width: 50, height: 50 }} />
                    <Box>
                        <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                            {props?.profile?.name}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            {props?.profile?.role?.name}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            display="flex"
                            alignItems="center"
                            gap={1}
                        >
                            <MailRounded width={15} height={15} />
                            {props?.profile?.email}
                        </Typography>
                    </Box>
                </Stack>
                <Divider />
                {ProfileMenus.map(({icon: Component, ...profile}) => (
                    <Box key={profile.title}>
                        <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                            <Link href={profile.href}>
                                <Stack direction="row" spacing={2}>
                                    <Box
                                        width="45px"
                                        height="45px"
                                        bgcolor="primary.light"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Component
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: 0,
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight={600}
                                            color="textPrimary"
                                            className="text-hover"
                                            noWrap
                                            sx={{
                                                width: '240px',
                                            }}
                                        >
                                            {profile.title}
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="subtitle2"
                                            sx={{
                                                width: '240px',
                                            }}
                                            noWrap
                                        >
                                            {profile.subtitle}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Link>
                        </Box>
                    </Box>
                ))}
                <Box mt={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
