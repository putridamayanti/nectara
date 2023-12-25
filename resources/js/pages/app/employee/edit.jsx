import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import EmployeeForm from "../../../src/components/pages/employee/EmployeeForm.jsx";

export default function Edit({ roles, departments, designations, employee, user }) {
    return (
        <>
            <Breadcrumb
                title="Update Employee"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Employees', to: '/app/employee' },
                    { title: 'Update Employee' },
                ]}/>
            <Box>
                <EmployeeForm
                    data={{...user, ...employee}}
                    roles={roles}
                    departments={departments}
                    designations={designations}/>
            </Box>
        </>
    )
}
