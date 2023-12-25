import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import ReportBasicChart from "../../../src/components/pages/report/ReportBasicChart.jsx";
import {useMemo} from "react";
import DashboardCard from "../../../src/components/cards/DashboardCard.jsx";
import ExpenseDepositChart from "../../../src/components/pages/dashboard/ExpenseDepositChart.jsx";

export default function ReportFinance(props) {
    const { monthly_expense, monthly_deposit } = props;

    return (
        <>
            <Breadcrumb
                title="Report Finance"
                subtitle="Chart and list report of finance"/>
            <ExpenseDepositChart
                deposit={monthly_deposit}
                expense={monthly_expense}/>
        </>
    )
}
