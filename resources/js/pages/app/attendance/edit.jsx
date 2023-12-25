import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import AttendanceForm from "../../../src/components/pages/attendance/AttendanceForm.jsx";

export default function Edit({ attendance, employees }) {
    return (
        <>
            <Breadcrumb
                title="Update Attendance"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Attendances', to: '/app/attendance' },
                    { title: 'Update Attendance' },
                ]}/>
            <Box>
                <AttendanceForm
                    data={attendance}
                    employees={employees}/>
            </Box>
        </>
    )
}
