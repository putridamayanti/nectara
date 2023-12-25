import React from "react";
import {Box, Card, CardContent, Stack, Typography, useTheme} from "@mui/material";

const DashboardCard = (props) => {
    const {cardHeading, headTitle, headSubtitle, title, subtitle, action, children, middleContent, footer } = props;
    const theme = useTheme();

    return (
        <Card
            sx={{ padding: 0, border: 'none' }}
            elevation={9}>
            {cardHeading ? (
                <CardContent>
                    <Typography variant="h5">{headTitle}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {headSubtitle}
                    </Typography>
                </CardContent>
            ) : (
                <CardContent sx={{p: "30px"}}>
                    {title ? (
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="space-between"
                            alignItems={'center'}
                            mb={3}
                        >
                            <Box>
                                {title ? <Typography variant="h5">{title}</Typography> : ''}

                                {subtitle ? (
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {subtitle}
                                    </Typography>
                                ) : (
                                    ''
                                )}
                            </Box>
                            {action}
                        </Stack>
                    ) : null}

                    {children}
                </CardContent>
            )}

            {middleContent}
            {footer}
        </Card>
    );
};

export default DashboardCard;
