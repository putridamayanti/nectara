import React from "react";
import DashboardCard from "../../cards/DashboardCard.jsx";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import dayjs from "dayjs";

const TodayAttendance = ({ data, title, subtitle, header }) => {
    return (
        <DashboardCard
            title={title}
            subtitle={subtitle}>
            <TableContainer>
                <Table sx={{whiteSpace: 'nowrap'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{header === 'employee' ? 'Employee' : 'Date'}</TableCell>
                            <TableCell>Clock In</TableCell>
                            <TableCell>Clock Out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>{e.employee ? e.employee?.name : dayjs(e.date).format('ddd, DD MMM YYYY')}</TableCell>
                                <TableCell>{e.clock_in ? dayjs(e.clock_in).format('HH:mm') : '-'}</TableCell>
                                <TableCell>{e.clock_out ? dayjs(e.clock_out).format('HH:mm') : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    )
};

export default TodayAttendance;
