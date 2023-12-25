import React from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box} from "@mui/material";
import ExpenseForm from "../../../src/components/pages/expense/ExpenseForm.jsx";

export default function Create() {
    return (
        <>
            <Breadcrumb
                title="Create Expense"
                items={[
                    { title: 'Dashboard', to: '/app/dashboard' },
                    { title: 'Expenses', to: '/app/expense' },
                    { title: 'Create Expense' },
                ]}/>
            <Box sx={{ width: { xs: '100%', lg: '40%' }}}>
                <ExpenseForm/>
            </Box>
        </>
    )
}
