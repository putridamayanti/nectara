import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Box,
    Button,
    FormLabel,
    Stack,
    TextField
} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";

const LeaveTypeForm = ({ data }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: data?.name ?? '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Please enter name"),
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
            return Inertia.put(`/app/leave-type/${data?.id}`, values, {
                preserveState: (page) => submitResult(page),
            });
        }

        return Inertia.post('/app/leave-type', values, {
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
                    <FormLabel>Name<span style={{ color: 'red' }}>*</span></FormLabel>
                    <TextField
                        fullWidth
                        name="name"
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.name)}
                        helperText={formik.errors.name}
                        value={formik.values.name}/>
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

export default LeaveTypeForm;
