import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import EmployeeForm from "../../../src/components/pages/employee/EmployeeForm.jsx";

export default function Edit({ leaveType }) {
    return (
        <>
            <Breadcrumb
                title="Update Leave Type"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Leave Types', to: '/app/leave-type' },
                    { title: 'Update Leave Type' },
                ]}/>
            <Box sx={{ width: { xs: '100%', md: '50%', lg: '40%' }}}>
                <EmployeeForm data={leaveType}/>
            </Box>
        </>
    )
}
