import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import EmployeeForm from "../../../src/components/pages/employee/EmployeeForm.jsx";

export default function Create({ users, roles, departments, designations }) {
    return (
        <>
            <Breadcrumb
                title="Create Employee"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Departments', to: '/app/employee' },
                    { title: 'Create Employee' },
                ]}/>
            <Box>
                <EmployeeForm
                    users={users}
                    roles={roles}
                    departments={departments}
                    designations={designations}/>
            </Box>
        </>
    )
}
