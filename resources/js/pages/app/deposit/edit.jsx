import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import DepositForm from "../../../src/components/pages/deposit/DepositForm.jsx";

export default function Edit({ deposit }) {
    return (
        <>
            <Breadcrumb
                title="Update Deposit"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Deposit', to: '/app/deposit' },
                    { title: 'Update Deposit' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <DepositForm data={deposit}/>
            </Box>
        </>
    )
}
