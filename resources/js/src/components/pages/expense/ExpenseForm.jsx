import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Box,
    Button,
    FormLabel, InputAdornment,
    Stack,
    TextField
} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import dayjs from "dayjs";
import CustomDatePicker from "../../forms/Datepicker/CustomDatePicker.jsx";

const ExpenseForm = ({ data }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? '',
            amount: data?.amount ?? '',
            description: data?.description ?? '',
            date: data?.date ?? '',
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Please enter title"),
            amount: Yup.string().required("Please enter amount"),
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
            return Inertia.put(`/app/expense/${data?.id}`, values, {
                preserveState: (page) => submitResult(page),
            });
        }

        return Inertia.post('/app/expense', values, {
            preserveState: (page) => submitResult(page),
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} justifyContent="end" alignItems="end">
                {error && (
                    <Alert severity="error">{error}</Alert>
                )}
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Title<span style={{ color: 'red' }}>*</span></FormLabel>
                    <TextField
                        fullWidth
                        name="title"
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.title)}
                        helperText={formik.errors.title}
                        value={formik.values.title}/>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Amount<span style={{ color: 'red' }}>*</span></FormLabel>
                    <TextField
                        fullWidth
                        name="amount"
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.amount)}
                        helperText={formik.errors.amount}
                        value={formik.values.amount}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}/>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Date<span style={{ color: 'red' }}>*</span></FormLabel>
                    <CustomDatePicker
                        onChange={val => formik.setFieldValue('date', val)}
                        value={formik.values.date ? dayjs(formik.values.date) : null}/>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}/>
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

export default ExpenseForm;
