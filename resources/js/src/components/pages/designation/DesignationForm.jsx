import React, {useEffect} from "react";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Box,
    Button,
    FormLabel, MenuItem, Select,
    Stack,
    TextField
} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";

const DesignationForm = ({ data, departments }) => {
    const { props } = usePage();
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: data?.name ?? '',
            department_id: data?.department_id ?? '',
            description: data?.description ?? '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Please enter name"),
            department_id: Yup.string().required("Please enter department"),
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
            return Inertia.put(`/app/designation/${data?.id}`, values);
        }

        return Inertia.post('/app/designation', values);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} justifyContent="end" alignItems="end">
                {error && (
                    <Box sx={{ width: '100%' }}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
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
                    <FormLabel>Department<span style={{ color: 'red' }}>*</span></FormLabel>
                    <Select
                        fullWidth
                        name="department_id"
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.department_id)}
                        helperText={formik.errors.department_id}
                        value={formik.values.department_id}>
                        {departments?.map((e, i) => (
                            <MenuItem key={i} value={e.id}>
                                {e.name}
                            </MenuItem>
                        ))}
                    </Select>
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

export default DesignationForm;
