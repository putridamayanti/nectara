import React, {useMemo} from "react";
import Chart from 'react-apexcharts';
import DashboardCard from "../../cards/DashboardCard.jsx";
import {Box, useTheme} from "@mui/material";

const EmployeeDepartmentChart = ({ data}) => {
    const theme = useTheme();

    const dataSeries = useMemo(() => {
        return {
            series: data?.map(e => e.count),
            labels: data?.map(e => e.department?.name)
        };

    }, [data]);

    const options = {
        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
            labels: dataSeries.labels,
            dataLabels: {
                enabled: false,
                show: false
            },
            colors: [
                theme.palette.primary.main,
                theme.palette.pink.main,
                theme.palette.warning.main,
                theme.palette.secondary.main,
                theme.palette.success.main,
                theme.palette.info.main,
            ],
            legend: {
                show: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            total: {
                                show: true
                            }
                        }
                    }
                }
            }
        },
    };

    return (
        <DashboardCard
            title="Employment By Department">
            <Box sx={{ height: 360 }}>
                <Chart
                    options={options.options}
                    series={dataSeries.series}
                    type="donut"
                    // width={"100%"}
                />
            </Box>
        </DashboardCard>
    )
};

export default EmployeeDepartmentChart;
