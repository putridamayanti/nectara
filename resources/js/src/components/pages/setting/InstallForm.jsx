import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Inertia} from "@inertiajs/inertia";
import {Alert, Box, Button, FormLabel, Stack, TextField} from "@mui/material";
import CountrySelect from "../../forms/CountrySelect.jsx";
import PhoneInput from "../../forms/PhoneInput.jsx";

const InstallForm = () => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            name: Yup.string().required("Please enter a name"),
            phone: Yup.string().required("Please enter a phone"),
            country_code: Yup.object().required("Please enter a country"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        const params = {
            ...values,
            country_code: values.country_code?.code,
            currency: values.country_code?.currency
        }

        Inertia.post('/initial-setting', params);
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    {error && (
                        <Alert severity="error">{error}</Alert>
                    )}
                    <Box>
                        <FormLabel>Company Name</FormLabel>
                        <TextField
                            fullWidth
                            name="name"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}
                            value={formik.values.name}/>
                    </Box>
                    <Box>
                        <FormLabel>Email Address</FormLabel>
                        <TextField
                            fullWidth
                            name="email"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                            value={formik.values.email}
                            type="email"/>
                    </Box>
                    <Box>
                        <FormLabel>Country</FormLabel>
                        <CountrySelect
                            onChange={(val) => formik.setFieldValue('country_code', val)}
                            value={formik.values.country_code}/>
                    </Box>
                    <Box>
                        <FormLabel>Phone</FormLabel>
                        <PhoneInput
                            onChange={(val) => formik.setFieldValue('phone', val)}
                            value={formik.values.phone}/>
                    </Box>
                    <Box>
                        <FormLabel>Address</FormLabel>
                        <TextField
                            fullWidth
                            name="address"
                            onChange={formik.handleChange}
                            value={formik.values.address}/>
                    </Box>
                    <Box>
                        <FormLabel>Zip Code</FormLabel>
                        <TextField
                            fullWidth
                            name="zipcode"
                            onChange={formik.handleChange}
                            value={formik.values.zipcode}/>
                    </Box>
                    <Box>
                        <FormLabel>Default Leave Quota</FormLabel>
                        <TextField
                            fullWidth
                            name="default_leave_quota"
                            onChange={formik.handleChange}
                            value={formik.values.default_leave_quota}/>
                    </Box>
                    <Button
                        fullWidth
                        // disabled={loadingSubmit}
                        color="primary"
                        variant="contained"
                        type="submit">
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    )
};

export default InstallForm;
