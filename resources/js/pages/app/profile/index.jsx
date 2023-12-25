import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import React from "react";
import UserForm from "../../../src/components/pages/user/UserForm.jsx";
import {usePage} from "@inertiajs/inertia-react";

export default function UpdateProfile({ profile, roles }) {
    const { url } = usePage();

    return (
        <>
            <Breadcrumb
                title="Update Profile"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Update Profile' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <UserForm
                    data={profile}
                    roles={roles}
                    redirectUrl={url}/>
            </Box>
        </>
    )
}
