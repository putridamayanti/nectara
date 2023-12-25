import React from "react";
import {usePage} from "@inertiajs/inertia-react";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import WidgetCard from "../../src/components/pages/dashboard/WidgetCard.jsx";
import {InventoryRounded, PeopleRounded, PunchClockRounded, ReceiptLongRounded} from "@mui/icons-material";
import ExpenseDepositChart from "../../src/components/pages/dashboard/ExpenseDepositChart.jsx";
import TodayAttendance from "../../src/components/pages/dashboard/TodayAttendance.jsx";
import PersonalAttendanceForm from "../../src/components/pages/attendance/PersonalAttendanceForm.jsx";
import EmployeeDepartmentChart from "../../src/components/pages/dashboard/EmployeeDepartmentChart.jsx";
import WeeklyAttendanceChart from "../../src/components/pages/dashboard/WeeklyAttendanceChart.jsx";

export default function Dashboard() {
    const { props } = usePage();

    const icons = [
        {icon: PeopleRounded, color: 'primary'},
        {icon: ReceiptLongRounded, color: 'pink'},
        {icon: InventoryRounded, color: 'warning'},
        {icon: PunchClockRounded, color: 'success'}
    ];

    return (
        <>
            <Grid container spacing={2}>
                {props?.show_clock && (
                    <Grid item xs={12} sm={12} md={12} lg={props?.widgets?.length > 2 ? 12 : 6}>
                        <Box sx={{
                            ...(props?.widgets?.length <= 2 && {
                                paddingTop: '20px',
                            })
                        }}>
                            <PersonalAttendanceForm/>
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Grid container spacing={3}>
                        {props?.widgets?.map((e, i) => {
                            let content = <span>
                                <span style={{
                                    fontSize: 12
                                }}>{props?.setting?.currency}</span>
                                {e.data}
                            </span>;

                            if (Array.isArray(e.data)) {
                                content = e.data.length;
                            }

                            return (
                                <Grid key={i} item xs={6} md={6} lg={6} xl={props?.widgets?.length > 2 ? 3 : 6}>
                                    <WidgetCard
                                        title={e.title}
                                        content={content}
                                        icon={icons[i].icon}
                                        color={icons[i].color}/>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                {props?.charts?.weekly_attendance && (
                    <Grid item xs={6} md={6} lg={6}>
                        <Box height={20}/>
                        <WeeklyAttendanceChart attendance={props?.charts?.weekly_attendance}/>
                    </Grid>
                )}
                {props?.charts?.annual_deposit && props?.charts?.annual_expense && (
                    <Grid item xs={12} sm={12} lg={8}>
                        <ExpenseDepositChart
                            deposit={props?.charts?.annual_deposit}
                            expense={props?.charts?.annual_expense}/>
                    </Grid>
                )}
                {props?.charts?.employee_department && (
                    <Grid item xs={6} md={6} lg={4}>
                        <EmployeeDepartmentChart data={props?.charts?.employee_department}/>
                    </Grid>
                )}
                {props?.today_attendance && (
                    <Grid item xs={12} md={12} lg={12}>
                        <TodayAttendance
                            title="Today Attendance"
                            subtitle="Latest employee attendance"
                            data={props?.today_attendance}
                            header="employee"/>
                    </Grid>
                )}
                {props?.personal_history_attendance && (
                    <Grid item xs={12} md={12} lg={12}>
                        <TodayAttendance
                            data={props?.personal_history_attendance}
                            title="History Attendance"
                            subtitle="List of this month attendance"
                            header="date"/>
                    </Grid>
                )}
            </Grid>
        </>
    )
}
