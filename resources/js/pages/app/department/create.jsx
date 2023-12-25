import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import DepartmentForm from "../../../src/components/pages/department/DepartmentForm.jsx";

export default function Create() {
    return (
        <>
            <Breadcrumb
                title="Create Department"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Departments', to: '/app/department' },
                    { title: 'Create Department' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <DepartmentForm/>
            </Box>
        </>
    )
}
