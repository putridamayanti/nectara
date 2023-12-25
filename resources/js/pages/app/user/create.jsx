import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import UserForm from "../../../src/components/pages/user/UserForm.jsx";

export default function Create({ roles }) {
    return (
        <>
            <Breadcrumb
                title="Create User"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Users', to: '/app/user' },
                    { title: 'Create User' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <UserForm roles={roles}/>
            </Box>
        </>
    )
}
