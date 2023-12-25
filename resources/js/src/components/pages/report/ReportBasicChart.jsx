import React from "react";
import {Box, useTheme} from "@mui/material";
import {basicBarChart} from "../../../constants/chart.jsx";
import DashboardCard from "../../cards/DashboardCard.jsx";
import Chart from "react-apexcharts";

const ReportBasicChart = ({ series, labels, title }) => {
    const theme = useTheme();

    const option = basicBarChart({
        labels: labels,
        colors: [theme.palette.secondary.main],
        max: 31
    });

    return (
        <DashboardCard
            title={title}>
            <Box sx={{ height: 400 }}>
                <Chart
                    options={option}
                    series={series}
                    type="bar"
                    height={"100%"}
                />
            </Box>
        </DashboardCard>
    )
};

export default ReportBasicChart;
