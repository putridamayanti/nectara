import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import RoleForm from "../../../src/components/pages/role/RoleForm.jsx";

export default function Edit({ role, features }) {
    return (
        <>
            <Breadcrumb
                title="Update Role"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Roles', to: '/app/role' },
                    { title: 'Update Role' },
                ]}/>
            <Box>
                <RoleForm data={role} features={features}/>
            </Box>
        </>
    )
}
