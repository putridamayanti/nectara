import React, {useState} from "react";
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
import CustomDatePicker from "../../forms/Datepicker/CustomDatePicker.jsx";
import CustomTimePicker from "../../forms/Datepicker/CustomTimePicker.jsx";
import dayjs from "dayjs";

const AttendanceForm = ({ data, employees, isPersonal, hideDate }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            employee_id: data?.employee_id ?? '',
            date: data?.date ?? '',
            clock_in: data?.clock_in ?? '',
            clock_out: data?.clock_out ?? '',
        },
        validationSchema: Yup.object().shape({
            employee_id: Yup.string().required("Please select the employee"),
            date: Yup.string().required("Please enter date"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    const submitResult = (page) => {
        const errors = Object.keys(page.props.errors).map(key => page.props.errors[key]);
        setError(errors.join('\n'));
        setLoadingSubmit(false);
    };

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        if (data?.id) {
            return Inertia.put(`/app/attendance/${data?.id}`, values, {
                preserveState: (page) => submitResult(page),
            });
        }

        return Inertia.post('/app/attendance', values, {
            preserveState: (page) => submitResult(page),
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} alignItems="end">
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Employee<span style={{ color: 'red' }}>*</span></FormLabel>
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
                </Box>
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Date<span style={{ color: 'red' }}>*</span></FormLabel>
                    <CustomDatePicker
                        disablePast
                        onChange={(val) => formik.setFieldValue('date', val)}
                        value={formik.values.date ? dayjs(formik.values.date) : null}/>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box sx={{ width: '100%' }}>
                                <FormLabel>Clock In<span style={{ color: 'red' }}>*</span></FormLabel>
                                <CustomTimePicker
                                    onChange={(val) => formik.setFieldValue('clock_in', val)}
                                    value={formik.values.clock_in ? dayjs(formik.values.clock_in) : null}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Box sx={{ width: '100%' }}>
                                <FormLabel>Clock Out</FormLabel>
                                <CustomTimePicker
                                    onChange={(val) => formik.setFieldValue('clock_out', val)}
                                    value={formik.values.clock_out ? dayjs(formik.values.clock_out) : null}/>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
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

export default AttendanceForm;
