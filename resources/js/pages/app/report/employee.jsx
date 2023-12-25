import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ReportBasicChart from "../../../src/components/pages/report/ReportBasicChart.jsx";
import {useMemo} from "react";
import DashboardCard from "../../../src/components/cards/DashboardCard.jsx";

export default function ReportEmployee(props) {
    const { employee, monthly_employee } = props;

    const monthNames = Array.from({ length: 12 }, (_, i) =>
        dayjs().month(i).format('MMM')
    );

    const dataSeries = useMemo(() => {
        return Array.from({length: 12}, (_, i) => {
            const exist = monthly_employee.find(e => dayjs(e.month).get('month') === i);
            if (exist) {
                return exist.count;
            } else {
                return 0;
            }
        });
    }, [monthly_employee]);

    return (
        <>
            <Breadcrumb
                title="Report Attendance"
                subtitle="Chart and list report of attendance"/>
            <ReportBasicChart
                labels={monthNames}
                series={[{name: 'Employee', data: dataSeries}]}
                title="Monthly Employee"/>
            <Box height={20}/>
            <DashboardCard title="List of Employee">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Designation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employee.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>{e.name}</TableCell>
                                <TableCell>{e.department?.name}</TableCell>
                                <TableCell>{e.designation?.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DashboardCard>
        </>
    )
}
