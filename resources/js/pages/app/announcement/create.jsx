import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import AnnouncementForm from "../../../src/components/pages/announcement/AnnouncementForm.jsx";

export default function Create() {
    return (
        <>
            <Breadcrumb
                title="Create Announcement"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Announcements', to: '/app/announcement' },
                    { title: 'Create Announcement' },
                ]}/>
            <Box sx={{
                width: { xs: '100%', lg: '40%' }
            }}>
                <AnnouncementForm/>
            </Box>
        </>
    )
}
