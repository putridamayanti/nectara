import React from "react";
import {Alert, Box, Button, FormLabel, IconButton, InputAdornment, Stack, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useState} from "react";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import * as Yup from 'yup';
import { Inertia } from '@inertiajs/inertia';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required("Please enter a password"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);
        Inertia.post('/login', values, {
            preserveState: (page) => {
                const errors = Object.keys(page.props.errors).map(key => page.props.errors[key]);
                setError(errors.join('\n'));
                setLoadingSubmit(true);
            },
        });
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    {error && (
                        <Alert severity="error">{error}</Alert>
                    )}
                    <Box>
                        <FormLabel>Email Address</FormLabel>
                        <TextField
                            fullWidth
                            name="email"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}
                            type="email"/>
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <TextField
                            fullWidth
                            name="password"
                            error={Boolean(formik.errors.password)}
                            helperText={formik.errors.password}
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                    </IconButton>
                                </InputAdornment>
                            }}/>
                    </Box>
                    <Button
                        fullWidth
                        disabled={loadingSubmit}
                        color="primary"
                        variant="contained"
                        type="submit">
                        Login
                    </Button>
                </Stack>
            </form>
        </Box>
    )
};

export default LoginForm;
