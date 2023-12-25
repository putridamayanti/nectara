import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Box,
    Button,
    FormLabel, Grid, MenuItem, Select,
    Stack,
    TextField
} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LeaveStatus} from "../../../constants/constants.jsx";
import CustomDatePicker from "../../forms/Datepicker/CustomDatePicker.jsx";
import dayjs from "dayjs";

const LeaveForm = ({ data, employees, leaveTypes }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            employee_id: data?.employee_id ?? '',
            leave_type_id: data?.leave_type_id ?? '',
            title: data?.title ?? '',
            reason: data?.reason ?? '',
            days: data?.days ?? '',
            start_date: data?.start_date ?? '',
            end_date: data?.end_date ?? '',
            status: data?.status ?? '',
        },
        validationSchema: Yup.object().shape({
            employee_id: Yup.string().required("Please enter employee"),
            title: Yup.string().required("Please enter title"),
            days: Yup.string().required("Please enter days"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    useEffect(() => {
        if (formik.values.start_date && formik.values.days) {
            formik.setFieldValue('end_date', dayjs(formik.values.start_date).add(formik.values.days, 'day'))
        }
    }, [formik.values.start_date, formik.values.days]);

    const submitResult = (page) => {
        const errors = Object.keys(page.props.errors).map(key => page.props.errors[key]);
        setError(errors.join('\n'));
        setLoadingSubmit(false);
    };

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        if (data?.id) {
            return Inertia.put(`/app/leave/${data?.id}`, values, {
                preserveState: (page) => submitResult(page),
            });
        }

        return Inertia.post('/app/leave', values, {
            preserveState: (page) => submitResult(page),
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} justifyContent="end" alignItems="end">
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Employee<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Select
                            fullWidth
                            name="employee_id"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.employee_id)}
                            helperText={formik.errors.employee_id}
                            value={formik.values.employee_id}>
                            {employees?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Leave Type</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Select
                            fullWidth
                            name="leave_type_id"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.leave_type_id)}
                            helperText={formik.errors.leave_type_id}
                            value={formik.values.leave_type_id}>
                            {leaveTypes?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Title<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <TextField
                            fullWidth
                            name="title"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.title)}
                            helperText={formik.errors.title}
                            value={formik.values.title}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Reason</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            name="reason"
                            onChange={formik.handleChange}
                            value={formik.values.reason}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Start Date<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <CustomDatePicker
                            onChange={(val) => formik.setFieldValue('start_date', val)}
                            value={formik.values.start_date ? dayjs(formik.values.start_date) : null}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Days<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <TextField
                            fullWidth
                            name="days"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.days)}
                            helperText={formik.errors.days}
                            value={formik.values.days}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>End Date</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <CustomDatePicker
                            onChange={(val) => formik.setFieldValue('end_date', val)}
                            value={formik.values.end_date ? dayjs(formik.values.end_date) : null}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Status</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Select
                            fullWidth
                            name="status"
                            onChange={formik.handleChange}
                            value={formik.values.status}>
                            {Object.keys(LeaveStatus).map(key => (
                                <MenuItem key={key} value={LeaveStatus[key].value}>
                                    {LeaveStatus[key].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Button
                    disabled={loadingSubmit}
                    color="primary"
                    variant="contained"
                    type="submit">
                    Submit
                </Button>
            </Stack>
        </form>
    )
};

export default LeaveForm;
