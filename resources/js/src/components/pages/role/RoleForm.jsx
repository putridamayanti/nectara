import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Box,
    Button,
    FormLabel, Grid,
    Stack,
    TextField, Typography
} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import CustomCheckbox from "../../forms/CustomCheckbox.jsx";

const RoleForm = ({ data, features }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: data?.name ?? '',
            is_admin: data?.is_admin ?? 0,
            permissions: data?.permissions?.map(e => e.permission_id) ?? []
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Please enter name"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    const handleChangePermission = (id) => {
        const findIndex = formik.values?.permissions?.indexOf(id);
        if (findIndex !== -1) {
            formik.setFieldValue('permissions', formik.values.permissions.filter(e => e !== id));
        } else {
            formik.setFieldValue('permissions', [...formik.values.permissions, id]);
        }
    };

    const submitResult = (page) => {
        const errors = Object.keys(page.props.errors).map(key => page.props.errors[key]);
        setError(errors.join('\n'));
        setLoadingSubmit(false);
    };

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        if (data?.id) {
            return Inertia.put(`/app/role/${data?.id}`, values, {
                preserveState: (page) => submitResult(page),
            });
        }

        return Inertia.post('/app/role', values, {
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
                <Box sx={{ width: '100%' }}>
                    <CustomCheckbox
                        checked={formik.values.is_admin}
                        onChange={(e) => formik.setFieldValue('is_admin', e.target.checked)}/>
                    <FormLabel>Is Administrator?</FormLabel>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="content"
                        onChange={formik.handleChange}
                        value={formik.values.content}/>
                </Box>
                <Box sx={{ width: '100%' }}>
                    {features.map((e, i) => (
                        <Box key={i} sx={{ padding: '24px 0', borderBottom: '1px solid #ddd' }}>
                            <Typography sx={{ fontStyle: 'italic' }}>{e.name}</Typography>
                            <Grid container spacing={1}>
                                {e?.permissions?.map((item, j) => (
                                    <Grid key={j} item xs={12} sm={6} lg={3}>
                                        <CustomCheckbox
                                            disabled={formik.values.is_admin}
                                            checked={formik.values.permissions?.indexOf(item.id) !== -1 && !formik.values.is_admin}
                                            onChange={(e) => handleChangePermission(item.id)}/>
                                        <FormLabel>{item.name}</FormLabel>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </Box>
                <Button
                    // disabled={loadingSubmit}
                    color="primary"
                    variant="contained"
                    type="submit">
                    Submit
                </Button>
            </Stack>
        </form>
    )
};

export default RoleForm;
