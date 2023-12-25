import React, {useState, useEffect} from "react";
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
import CustomSwitch from "../../forms/CustomSwitch.jsx";
import {usePage} from "@inertiajs/inertia-react";

const AnnouncementForm = ({ data }) => {
    const { props } = usePage();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            title: data?.title ?? '',
            content: data?.content ?? '',
            status: data?.status ?? false,
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Please enter title"),
            content: Yup.string().required("Please enter content"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    useEffect(() => {
        const errors = Object.keys(props.errors).map(key => props.errors[key]);
        if (errors.length > 0) {
            setError(errors.join('\n'));
        }
    }, [props.errors]);

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        if (data?.id) {
            return Inertia.put(`/app/announcement/${data?.id}`, values);
        }

        return Inertia.post('/app/announcement', values);
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
                    <FormLabel>Content<span style={{ color: 'red' }}>*</span></FormLabel>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="content"
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.content)}
                        helperText={formik.errors.content}
                        value={formik.values.content}/>
                </Box>
                <Box sx={{ width: { xs: '100%', lg: '50%' }}}>
                    <Stack direction="row" alignItems="center" spacing={4}>
                        <FormLabel>Status</FormLabel>
                        <CustomSwitch
                            checked={formik.values.status}
                            onChange={(e) => formik.setFieldValue('status', e.target.checked)}/>
                    </Stack>
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

export default AnnouncementForm;
