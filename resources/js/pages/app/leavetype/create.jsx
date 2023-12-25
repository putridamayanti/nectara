import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import LeaveTypeForm from "../../../src/components/pages/leavetype/LeaveTypeForm.jsx";

export default function Create() {
    return (
        <>
            <Breadcrumb
                title="Create Leave Type"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Departments', to: '/app/leave-type' },
                    { title: 'Create Leave Type' },
                ]}/>
            <Box sx={{ width: { xs: '100%', md: '50%', lg: '40%' }}}>
                <LeaveTypeForm/>
            </Box>
        </>
    )
}
