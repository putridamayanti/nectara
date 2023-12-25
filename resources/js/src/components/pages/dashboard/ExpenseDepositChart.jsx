import React, {useEffect, useRef, useState} from "react";
import DashboardCard from "../../cards/DashboardCard.jsx";
import {Avatar, Box, Button, Grid, Stack, Typography, useTheme} from "@mui/material";
import Chart from 'react-apexcharts';
import dayjs from "dayjs";
import {upsideDownChart} from "../../../constants/chart.jsx";

const ExpenseDepositChart = ({ expense, deposit, setting }) => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.dark;

    const [data, setData] = useState({
        expense: [],
        deposit: [],
        monthlyExpense: 0,
        monthlyDeposit: 0
    });

    const monthNames = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format('MMM')
    );

    const renderData = (data) => {
        return Array.from({length: 12}, (_, i) => {
            const exist = data.find(e => dayjs(e.month).get('month') === i);
            if (exist) {
                return parseFloat(exist.total).toFixed(2);
            } else {
                return 0;
            }
        });
    };

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && expense) {
            const expenseData = renderData(expense);
            const depositData = renderData(deposit);

            setData({
                expense: expenseData.map(e => e !== 0 ? -e : 0),
                deposit: depositData,
                monthlyExpense: expenseData[dayjs().get('month')],
                monthlyDeposit: depositData[dayjs().get('month')],
            });

            mounted.current = true;
        }
    });

    const optionscolumnchart = upsideDownChart({
        colors: [primary, secondary],
        height: 360,
        min: -5000,
        max: 5000,
        categories: monthNames
    });

    return (
        <DashboardCard
            title="Annual Expense & Deposit"
            subtitle="Overview of expense and deposit">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <Box className="rounded-bars">
                        <Chart
                            options={optionscolumnchart}
                            series={[
                                {
                                    name: 'Deposit this month',
                                    data: data.deposit,
                                },
                                {
                                    name: 'Expense this month',
                                    data: data.expense,
                                },
                            ]}
                            type="bar"
                            height={320}
                            width={"100%"}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Stack spacing={3} my={5}>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                sx={{ width: 9, mt: 1, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                            ></Avatar>
                            <Box>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Deposit this month
                                </Typography>
                                <Typography variant="h5">
                                    {setting?.currency} {data.monthlyDeposit}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                sx={{ width: 9, mt: 1, height: 9, bgcolor: secondary, svg: { display: 'none' } }}
                            ></Avatar>
                            <Box>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Expense this month
                                </Typography>
                                <Typography variant="h5">
                                    {setting?.currency} {data.monthlyExpense}
                                </Typography>
                            </Box>
                        </Stack>
                    </Stack>
                    <Button color="primary" variant="contained" fullWidth>
                        View Full Report
                    </Button>
                </Grid>
            </Grid>
        </DashboardCard>
    );
};

export default ExpenseDepositChart;
