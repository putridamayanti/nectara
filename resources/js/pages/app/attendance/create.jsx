import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import AttendanceForm from "../../../src/components/pages/attendance/AttendanceForm.jsx";

export default function Create({ employees }) {
    return (
        <>
            <Breadcrumb
                title="Create Attendance"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Attendances', to: '/app/attendance' },
                    { title: 'Create Attendance' },
                ]}/>
            <Box sx={{ width: { xs: '100%', sm: '100%', lg: '40%' }}}>
                <AttendanceForm employees={employees}/>
            </Box>
        </>
    )
}
