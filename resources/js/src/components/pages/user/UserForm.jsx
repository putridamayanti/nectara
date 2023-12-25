import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Button,
    FormLabel, Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import {Inertia} from "@inertiajs/inertia";

const UserForm = ({ data, roles, redirectUrl }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: data?.name ?? '',
            email: data?.email ?? '',
            password: data?.password ?? '',
            role_id: data?.role_id ?? '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Please enter name"),
            email: Yup.string().required("Please enter email"),
            password: Yup.string().required("Please enter password"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        if (redirectUrl) {
            values.redirect_url = redirectUrl;
        }

        setLoadingSubmit(true);
        if (data?.id) {
            return Inertia.put(`/app/user/${data?.id}`, values, {
                preserveState: (page) => {
                    const errors = Object.keys(page.props.errors).map(key => page.props.errors[key]);
                    setError(errors.join('\n'));
                    setLoadingSubmit(false);
                },
            });
        }

        return Inertia.post('/app/user', values, {
            preserveState: (page) => {
                const errors = Object.keys(page.props.errors).map(key => page.props.errors[key]);
                setError(errors.join('\n'));
                setLoadingSubmit(false);
            },
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
                        <FormLabel>Name<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <TextField
                            fullWidth
                            name="name"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}
                            value={formik.values.name}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Email<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <TextField
                            fullWidth
                            name="email"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                            value={formik.values.email}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Password<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <TextField
                            fullWidth
                            name="password"
                            error={Boolean(formik.errors.password)}
                            helperText={formik.errors.password || (data?.id && 'Leave empty if do not want to change')}
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityRounded fontSize="small"/>
                                            : <VisibilityOffRounded fontSize="small"/>}
                                    </IconButton>
                                </InputAdornment>
                            }}/>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Role<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Select
                            fullWidth
                            name="role_id"
                            onChange={formik.handleChange}
                            value={formik.values.role_id}>
                            {roles.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
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

export default UserForm;
