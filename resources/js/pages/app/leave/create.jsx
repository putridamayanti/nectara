import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import LeaveForm from "../../../src/components/pages/leave/LeaveForm.jsx";

export default function Create({ employees, types }) {
    return (
        <>
            <Breadcrumb
                title="Create Leave"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Departments', to: '/app/leave' },
                    { title: 'Create Leave' },
                ]}/>
            <Box>
                <LeaveForm
                    employees={employees}
                    leaveTypes={types}/>
            </Box>
        </>
    )
}
