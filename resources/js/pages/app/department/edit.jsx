import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import DepartmentForm from "../../../src/components/pages/department/DepartmentForm.jsx";

export default function Edit({ department }) {
    return (
        <>
            <Breadcrumb
                title="Update Department"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Departments', to: '/app/department' },
                    { title: 'Update Department' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <DepartmentForm data={department}/>
            </Box>
        </>
    )
}
