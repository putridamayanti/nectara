import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import React from "react";
import dayjs from "dayjs";
import {
    Box,
    Card,
    CardContent,
    Typography
} from "@mui/material";
import AttendanceThisMonthGraph from "../../../src/components/pages/report/AttendanceThisMonthGraph.jsx";
import AttendanceMonthlyChart from "../../../src/components/pages/report/AttendanceMonthlyChart.jsx";

const ReportAttendance = (props) => {
    const { attendance, annual_attendance } = props;

    return (
        <>
            <Breadcrumb
                title="Report Attendance"
                subtitle="Chart and list report of attendance"/>
            <Card>
                <CardContent>
                    <Typography>Today is</Typography>
                    <Typography variant="h4">
                        {dayjs().format('ddd, DD MMM YYYY HH:mm')}
                    </Typography>
                </CardContent>
            </Card>
            <Box height={20}/>
            <AttendanceThisMonthGraph attendance={attendance}/>
            <Box height={20}/>
            <AttendanceMonthlyChart attendance={annual_attendance}/>
        </>
    )
};

export default ReportAttendance;
