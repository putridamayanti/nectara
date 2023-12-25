import {
    Box,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
    useTheme
} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import DashboardCard from "../../cards/DashboardCard.jsx";

const AttendanceThisMonthGraph = ({ attendance }) => {
    const theme = useTheme();
    const daysInMonth = dayjs().daysInMonth();
    const dayNamesInMonth = Array.from({ length: daysInMonth }, (_, i) =>
        dayjs().date(i + 1).format('DD/MM')
    );

    return (
        <DashboardCard title="Employee Attendance">
            <Box sx={{
                width: '100%',
                overflowX: 'scroll'
            }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    colSpan={(dayNamesInMonth.length ?? 30) + 1}>
                                    <Typography variant="h5">
                                        {dayjs().format('MMMM')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell/>
                                {dayNamesInMonth.map((e, i) => {
                                    const dayItem = dayjs().format('DD/MM');

                                    return (
                                        <TableCell key={i} sx={{
                                            color: dayItem === e ? theme.palette.primary.main : theme.palette.text.secondary,
                                            fontWeight: dayItem === e ? 700 : 500,
                                        }}>{e}</TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendance.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell>{e.name}</TableCell>
                                    {dayNamesInMonth.map((day, j) => {
                                        let active = 'transparent';
                                        const exist = e.attendance.find(a => dayjs(a.date).format('DD/MM') === day);
                                        const today = dayjs();
                                        const dayItem = dayjs(`${day}/${today.get('year')}`, 'DD/MM/YYYY');

                                        if (exist && dayjs().isAfter(exist.date)) {
                                            active = theme.palette.primary.main;
                                        }

                                        if (!exist && dayItem.isBefore(today)) {
                                            active = theme.palette.grey.A400;
                                        }

                                        return (
                                            <TableCell sx={{ padding: '3px' }}>
                                                <Box sx={{
                                                    width: '100%',
                                                    height: 55,
                                                    borderRadius: 2,
                                                    background: active
                                                }}/>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </DashboardCard>
    )
};

export default AttendanceThisMonthGraph;
