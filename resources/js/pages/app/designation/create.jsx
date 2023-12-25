import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import DesignationForm from "../../../src/components/pages/designation/DesignationForm.jsx";

export default function Create({ departments }) {
    return (
        <>
            <Breadcrumb
                title="Create Designation"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Designations', to: '/app/designation' },
                    { title: 'Create Designation' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <DesignationForm departments={departments}/>
            </Box>
        </>
    )
}
