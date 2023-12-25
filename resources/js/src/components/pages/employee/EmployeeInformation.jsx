import {
    Card,
    CardContent,
    CardHeader,
    FormLabel,
    Grid,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, {useMemo, useState} from "react";
import {EmploymentType} from "../../../constants/constants.jsx";
import PhoneInput from "../../forms/PhoneInput.jsx";
import CustomDatePicker from "../../forms/Datepicker/CustomDatePicker.jsx";
import CountrySelect from "../../forms/CountrySelect.jsx";
import dayjs from "dayjs";

const EmployeeInformation = ({ formik, departments, designations }) => {
    const fields = [
        { label: 'Phone Number', name: 'phone', type: 'phone' },
        { label: 'Basic Salary', name: 'basic_salary', type: 'number' },
        { label: 'Employment Type', name: 'employment_type', type: 'select',
            options: Object.keys(EmploymentType).map(key => EmploymentType[key])},
        { label: 'Date of Birth', name: 'date_of_birth', type: 'date' },
        { label: 'Gender', name: 'gender', type: 'select', options: [{ name: 'Male', value: 1 }, { name: 'Female', value: 2 }] },
        { label: 'Country', name: 'country_code', type: 'country' },
        { label: 'City', name: 'city', },
        { label: 'Address', name: 'address' },
        { label: 'Zip Code', name: 'zipcode', type: 'number' },
        { label: 'Join Date', name: 'join_date', type: 'date' },
        { label: 'Leave Date', name: 'leave_date', type: 'date' },
        { label: 'Quota Leave', name: 'quota_leave', type: 'number' },
    ];

    const designationData = useMemo(() => {
        if (formik.values.department_id) {
            return designations.filter(e => e.department_id === formik.values.department_id);
        }

        return [];
    }, [formik.values.department_id]);

    return (
        <Card>
            <CardHeader title="Employee Information"/>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Department<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
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
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <FormLabel>Designation<span style={{ color: 'red' }}>*</span></FormLabel>
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <Select
                            fullWidth
                            name="designation_id"
                            onChange={formik.handleChange}
                            error={Boolean(formik.errors.designation_id)}
                            helperText={formik.errors.designation_id}
                            value={formik.values.designation_id}>
                            {designationData?.map((e, i) => (
                                <MenuItem key={i} value={e.id}>
                                    {e.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    {fields.map((e, i) => {
                        if (e.type === 'phone') {
                            return (
                                <>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormLabel>{e.label}</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={8} lg={9}>
                                        <PhoneInput
                                            onChange={(val) => formik.setFieldValue(e.name, val)}
                                            value={formik.values[e.name]}/>
                                    </Grid>
                                </>
                            )
                        }

                        if (e.type === 'select') {
                            return (
                                <>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormLabel>{e.label}</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={8} lg={9}>
                                        <Select
                                            fullWidth
                                            name={e.name}
                                            onChange={formik.handleChange}
                                            value={formik.values[e.name]}>
                                            {e.options?.map((e, i) => (
                                                <MenuItem key={i} value={e.id || e.value}>
                                                    {e.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                </>
                            )
                        }

                        if (e.type === 'date') {
                            return (
                                <>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormLabel>{e.label}</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={8} lg={9}>
                                        <CustomDatePicker
                                            onChange={(newValue) => formik.setFieldValue(e.name, newValue)}
                                            value={formik.values[e.name] ? dayjs(formik.values[e.name]) : null}/>
                                    </Grid>
                                </>
                            )
                        }

                        if (e.type === 'country') {
                            return (
                                <>
                                    <Grid item xs={12} md={4} lg={3}>
                                        <FormLabel>{e.label}</FormLabel>
                                    </Grid>
                                    <Grid item xs={12} md={8} lg={9}>
                                        <CountrySelect
                                            onChange={(val) => formik.setFieldValue(e.name, val)}
                                            value={formik.values[e.name] !== '' ? formik.values[e.name] : undefined}/>
                                    </Grid>
                                </>
                            )
                        }

                        return (
                            <>
                                <Grid item xs={12} md={4} lg={3}>
                                    <FormLabel>{e.label}</FormLabel>
                                </Grid>
                                <Grid item xs={12} md={8} lg={9}>
                                    <TextField
                                        fullWidth
                                        name={e.name}
                                        onChange={formik.handleChange}
                                        value={formik.values[e.name]}
                                    />
                                </Grid>
                            </>
                        )
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default EmployeeInformation;
