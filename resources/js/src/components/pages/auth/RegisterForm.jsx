'use client'

import {Box, Button, FormLabel, IconButton, InputAdornment, MenuItem, Select, Stack, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useState} from "react";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";
import * as Yup from 'yup';
import AuthService from "services/auth";
import {useRouter} from "next/navigation";
import {Role} from "constants/constants";

const RegisterForm = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: { email: '', name: '', password: '' },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required("Please enter a password")
            .min(8, "Password must have at least 8 characters"),
        }),
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        return AuthService.register(values).then(res => {
            if (res.status === 200) {
                router.push('/app');
            }
        });
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Box>
                        <FormLabel>Full Name</FormLabel>
                        <TextField
                            fullWidth
                            name="name"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.name)}
                            helperText={formik.errors.name}/>
                    </Box>
                    <Box>
                        <FormLabel>Email Address</FormLabel>
                        <TextField
                            fullWidth
                            name="email"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.email)}
                            helperText={formik.errors.email}/>
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

export default RegisterForm;