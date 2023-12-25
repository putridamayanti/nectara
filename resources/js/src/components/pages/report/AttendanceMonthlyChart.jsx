import dayjs from "dayjs";
import {useMemo} from "react";
import {Box, useTheme} from "@mui/material";
import Chart from "react-apexcharts";
import DashboardCard from "../../cards/DashboardCard.jsx";
import React from "react";
import {basicBarChart} from "../../../constants/chart.jsx";

const AttendanceMonthlyChart = ({ attendance }) => {
    const theme = useTheme();
    const monthNames = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format('MMM')
    );

    const dataSeries = useMemo(() => {
        return Array.from({length: 12}, (_, i) => {
            const exist = attendance.find(e => dayjs(e.month).get('month') === i);
            if (exist) {
                return exist.count;
            } else {
                return 0;
            }
        });
    }, [attendance]);

    const option = basicBarChart({
         labels: monthNames,
        colors: [theme.palette.secondary.main],
        max: 31
    });

    return (
        <DashboardCard
            title="Monthly Attendance">
            <Box sx={{ height: 400 }}>
                <Chart
                    options={option}
                    series={[
                        {name: 'Attendance', data: dataSeries}
                    ]}
                    type="bar"
                    height={"100%"}
                />
            </Box>
        </DashboardCard>
    )
};

export default AttendanceMonthlyChart;
