import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
    Alert,
    Box,
    Button,
    Stack,
} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import dayjs from "dayjs";
import UserCredential from "./UserCredential.jsx";
import EmployeeInformation from "./EmployeeInformation.jsx";
import countries from '/public/data/countries.json';

const EmployeeForm = ({ data, users, roles, departments, designations }) => {
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            user_id: data?.user_id ?? '',
            name: data?.name ?? '',
            email: data?.email ?? '',
            password: '',
            role_id: data?.role_id ?? '',
            department_id: data?.department_id ?? '',
            designation_id: data?.designation_id ?? '',
            phone: data?.phone ?? '',
            basic_salary: data?.basic_salary ?? '',
            employment_type: data?.employment_type ?? '',
            date_of_birth: data?.date_of_birth ?? '',
            gender: data?.gender ?? '',
            address: data?.address ?? '',
            country_code: data?.country_code ? countries.find(e => e.code === data?.country_code) : '',
            city: data?.city ?? '',
            zipcode: data?.zipcode ?? '',
            join_date: data?.join_date ?? '',
            leave_date: data?.leave_date ?? '',
            marital_status: data?.marital_status ?? '',
            quota_leave: data?.quota_leave ?? '',
            remaining_leave: data?.remaining_leave ?? '',
        },
        validationSchema: Yup.object().shape({
            department_id: Yup.string().required("Please enter department"),
            designation_id: Yup.string().required("Please enter designation"),
            phone: Yup.string().required("Please enter phone"),
            employment_type: Yup.string().required("Please enter employment type"),
            basic_salary: Yup.string().required("Please enter salary"),
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

        if (values.date) {
            values.date = dayjs(values.date).format('YYYY-MM-DD');
        }

        if (values.country_code?.code) {
            values.country_code = values.country_code?.code;
        }

        if (data?.id) {
            return Inertia.put(`/app/employee/${data?.id}`, values, {
                preserveState: (page) => submitResult(page),
            });
        }

        return Inertia.post('/app/employee', values, {
            preserveState: (page) => submitResult(page),
        });
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            {error && (
                <Alert severity="error">{error}</Alert>
            )}

            <Stack spacing={5}>
                <UserCredential id={data?.id} formik={formik} users={users} roles={roles}/>
                <EmployeeInformation
                    formik={formik}
                    departments={departments}
                    designations={designations}/>
                <Stack spacing={2} justifyContent="end" alignItems="end">
                    <Button
                        // disabled={loadingSubmit}
                        color="primary"
                        variant="contained"
                        type="submit">
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
};

export default EmployeeForm;
