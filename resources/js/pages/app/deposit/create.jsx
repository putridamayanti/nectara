import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import DepositForm from "../../../src/components/pages/deposit/DepositForm.jsx";

export default function Create() {
    return (
        <>
            <Breadcrumb
                title="Create Deposit"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Deposits', to: '/app/deposit' },
                    { title: 'Create Deposit' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <DepositForm/>
            </Box>
        </>
    )
}
