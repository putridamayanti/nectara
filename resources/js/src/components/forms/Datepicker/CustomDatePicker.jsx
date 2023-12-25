import {FormLabel, Stack} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import React from "react";

const CustomDatePicker = (props) => {
    const { label, required, ...rest } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack sx={{ width: '100%' }}>
                <DatePicker
                    format="YYYY-MM-DD"
                    {...rest} />
            </Stack>
        </LocalizationProvider>
    )
};

export default CustomDatePicker;
