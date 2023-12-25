import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import LeaveForm from "../../../src/components/pages/leave/LeaveForm.jsx";

export default function Edit({ leave, employees, types }) {
    return (
        <>
            <Breadcrumb
                title="Update Leave"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Leaves', to: '/app/leave' },
                    { title: 'Update Leave' },
                ]}/>
            <Box>
                <LeaveForm
                    data={leave}
                    employees={employees}
                    leaveTypes={types}/>
            </Box>
        </>
    )
}
