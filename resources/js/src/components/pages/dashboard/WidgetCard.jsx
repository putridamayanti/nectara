import React from "react";
import {Box, Card, CardContent, styled, Typography, useTheme} from "@mui/material";

const IconBox = styled(Box)(({ theme, color }) => ({
    width: 50,
    height: 50,
    background: theme.palette[color].main,
    borderRadius: 10,
    position: 'absolute',
    right: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const WidgetCard = (props) => {
    const theme = useTheme();
    const { color, icon: Component, title, content } = props;

    return (
        <Box position="relative">
            <IconBox color={color}>
                <Component sx={{ color: 'white' }}/>
            </IconBox>
            <Box height={20}/>
            <Card sx={{ height: 120 }}>
                <CardContent>
                    <Box height={15}/>
                    <Typography sx={{ fontSize: 12, color: theme.palette.grey.A400 }}>{title}</Typography>
                    <Box height={15}/>
                    <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
};

export default WidgetCard;
