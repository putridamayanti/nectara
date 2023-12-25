import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import dayjs from "dayjs";
import DashboardCard from "../../cards/DashboardCard.jsx";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Inertia} from "@inertiajs/inertia";
import {usePage} from "@inertiajs/inertia-react";

const PersonalAttendanceForm = () => {
    const { url, props } = usePage();
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const formik = useFormik({
        initialValues: {
            employee_id: props?.employee?.id ?? '',
            date: props?.today_attendance?.date ? dayjs(props?.today_attendance?.date) : dayjs(),
            clock_in: props?.today_attendance?.clock_in ?? '',
            clock_out: props?.today_attendance?.clock_out ?? '',
        },
        validationSchema: Yup.object().shape({
            employee_id: Yup.string().required("Please select the employee"),
            date: Yup.string().required("Please enter date"),
        }),
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: values => handleSubmit(values)
    });

    const handleSubmit = async (values) => {
        setLoadingSubmit(true);

        values.url = url;

        if (props?.today_attendance?.id) {
            return Inertia.put(`/app/attendance/${props?.today_attendance?.id}`, values);
        }

        return Inertia.post('/app/attendance', values);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <DashboardCard>
                <Grid container spacing={3} alignItems="center" sx={{ padding: 1 }}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography>Today</Typography>
                        <Typography variant="h4">
                            {dayjs().format('ddd, DD MMM YYYY HH:mm')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} display="flex" justifyContent="end">
                        {!props?.today_attendance ? (
                            <Button
                                variant="contained"
                                onClick={() => formik.setFieldValue('clock_in', dayjs())}
                                type="submit">
                                Clock In
                            </Button>
                        ) : (
                            <Stack spacing={2} alignItems="end">
                                <Typography>
                                    Clock In at: <strong>{dayjs(props?.today_attendance?.clock_in).format('ddd, DD MMM YYYY HH:mm')}</strong>
                                </Typography>
                                {props?.today_attendance?.clock_out ? (
                                    <Typography>
                                        Clock Out at: <strong>{dayjs(props?.today_attendance?.clock_out).format('ddd, DD MMM YYYY HH:mm')}</strong>
                                    </Typography>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={() => formik.setFieldValue('clock_out', dayjs())}
                                        type="submit">
                                        Clock Out
                                    </Button>
                                )}
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </DashboardCard>
        </form>
    )
};

export default PersonalAttendanceForm;
