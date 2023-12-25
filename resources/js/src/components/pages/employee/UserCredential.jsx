import {
    Card,
    CardContent,
    CardHeader,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment, MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import {VisibilityOffRounded, VisibilityRounded} from "@mui/icons-material";

const UserCredential = ({ id, formik, roles, users }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [userExist, setUserExist] = useState(false);

    const handleChangeUser = (userId) => {
        formik.setFieldValue('user_id', userId);
        setUserExist(true);
    };

    return (
        <Card>
            <CardHeader title="User Credential"/>
            <CardContent>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Select user if already exist</FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Select
                            fullWidth
                            name="user_id"
                            onChange={(e) => handleChangeUser(e.target.value)}
                            value={formik.values.user_id}>
                            {users?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    {!userExist && (
                        <>
                            <Grid item xs={12} md={4} lg={3}>
                                <FormLabel>Full Name<span style={{ color: 'red' }}>*</span></FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.name)}
                                    helperText={formik.errors.name}
                                    value={formik.values.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <FormLabel>Email Address<span style={{ color: 'red' }}>*</span></FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9}>
                                <TextField
                                    fullWidth
                                    name="email"
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.email)}
                                    helperText={formik.errors.email}
                                    value={formik.values.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <FormLabel>Password<span style={{ color: 'red' }}>*</span></FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.errors.password)}
                                    helperText={formik.errors.password || (id && 'Leave empty if do not want to change password')}
                                    value={formik.values.password}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <VisibilityRounded sx={{ fontSize: 16 }}/> : <VisibilityOffRounded sx={{ fontSize: 16 }}/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={3}>
                                <FormLabel>Role<span style={{ color: 'red' }}>*</span></FormLabel>
                            </Grid>
                            <Grid item xs={12} md={8} lg={9}>
                                <Select
                                    fullWidth
                                    name="role_id"
                                    onChange={formik.handleChange}
                                    value={formik.values.role_id}>
                                    {roles?.map((e, i) => (
                                        <MenuItem key={i} value={e.id}>
                                            {e.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </>
                    )}
                </Grid>
            </CardContent>
        </Card>
    )
};

export default UserCredential;
