import {Box, useTheme} from "@mui/material";
import React, {useMemo} from "react";
import DashboardCard from "../../cards/DashboardCard.jsx";
import Chart from "react-apexcharts";
import dayjs from "dayjs";

const WeeklyAttendanceChart = ({ attendance }) => {
    const theme = useTheme();

    const weekNames = Array.from({ length: 7 }, (_, i) =>
        dayjs().day(i).format('DD/MM')
    );

    const dataSeries = useMemo(() => {
        return Array.from({length: 7}, (_, i) => {
            const index = attendance?.findIndex(e => dayjs(e.date).get('day') === i);
            if (index !== -1) {
                return attendance[index].count;
            } else {
                return 0;
            }
        });
    }, [attendance]);

    const options = {
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'bar',
            },
            labels: weekNames,
            dataLabels: {
                enabled: false
            },
            colors: [theme.palette.secondary.main],
            legend: {
                enabled: false
            },
            yaxis: {
                min: 0,
                max: 20,
                tickAmount: 5,
            },
            plotOptions: {
                bar: {
                    borderRadius: 10
                }
            }
        },
    };

    return (
        <DashboardCard
            title="Weekly Attendance">
            <Box sx={{ height: 200 }}>
                <Chart
                    options={options.options}
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

export default WeeklyAttendanceChart;
