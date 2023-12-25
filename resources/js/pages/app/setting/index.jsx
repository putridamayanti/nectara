import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {
    Box,
} from "@mui/material";
import SettingForm from "../../../src/components/pages/setting/SettingForm.jsx";

export default function Setting({ setting }) {
    return (
        <>
            <Breadcrumb
                title="Update Setting"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Update Setting' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <SettingForm data={setting}/>
            </Box>
        </>
    )
}
