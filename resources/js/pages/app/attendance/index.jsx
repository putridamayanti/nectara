import React, {useState} from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Fab, IconButton, Pagination, Stack,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Tooltip, Typography
} from "@mui/material";
import EnhancedTableToolbar from "../../../src/components/table/EnhancedTableToolbar.jsx";
import {DefaultSort} from "../../../src/constants/sort.jsx";
import {Inertia} from "@inertiajs/inertia";
import {AddRounded, EditRounded} from "@mui/icons-material";
import CustomCheckbox from "../../../src/components/forms/CustomCheckbox.jsx";
import {router} from "@inertiajs/react";
import {Link, usePage} from "@inertiajs/inertia-react";
import CustomDatePicker from "../../../src/components/forms/Datepicker/CustomDatePicker.jsx";
import dayjs from "dayjs";

export default function Announcement({ attendance }) {
    const { url } = usePage();
    const [filter, setFilter] = useState({ sort: DefaultSort.name.value });
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const fetchData = (filter) => {
        if (filter.start || filter.end) {
            filter.start = dayjs(filter.start).format('YYYY-MM-DD');
            filter.end = dayjs(filter.end).format('YYYY-MM-DD');
        }

        return router.get(url, filter,{
            only: ['attendance'],
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleSelectItems = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(e => e !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const submitDelete = () => {
        return Inertia.delete(`/app/attendance/${selectedItems.join(',')}`)
    };

    return (
        <>
            <Breadcrumb
                title="Attendance"
                subtitle="List of Attendance"/>
            <Card>
                <CardContent>
                    <EnhancedTableToolbar
                        filter={filter}
                        numSelected={selectedItems.length}
                        handleChange={(newFilter) => {
                            setFilter({...filter, ...newFilter, page: 1});
                            fetchData({...filter, ...newFilter, page: 1});
                        }}
                        sortItems={DefaultSort}
                        onDelete={() => setDeleteConfirm(true)}
                    >
                        <Stack sx={{ width: '100%' }} direction="row" alignItems="end" spacing={2}>
                            <CustomDatePicker
                                label="Start Date"
                                onChange={(newValue) => setFilter({...filter, start: newValue})}
                                value={filter.start}/>
                            <Typography sx={{ paddingBottom: '10px' }} variant="h6">-</Typography>
                            <CustomDatePicker
                                label="End Date"
                                onChange={(newValue) => setFilter({...filter, end: newValue})}
                                value={filter.end}/>
                        </Stack>
                    </EnhancedTableToolbar>
                    <TableContainer>
                        <Table sx={{ whiteSpace: 'nowrap' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Employee</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Clock In</TableCell>
                                    <TableCell>Clock Out</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendance.data.length > 0 ? attendance?.data?.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell padding="checkbox">
                                            <CustomCheckbox
                                                color="primary"
                                                checked={selectedItems.includes(row.id)}
                                                onChange={() => handleSelectItems(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.employee?.name ?? '-'}</TableCell>
                                        <TableCell>{row.date ? dayjs(row.date).format('DD MMM YYYY') : '-'}</TableCell>
                                        <TableCell>{row.clock_in ? dayjs(row.clock_in).format('HH:mm') : '-'}</TableCell>
                                        <TableCell>{row.clock_out ? dayjs(row.clock_out).format('HH:mm') : '-'}</TableCell>
                                        <TableCell align="right">
                                            <Link href={`/app/attendance/${row.id}/edit`}>
                                                <Tooltip title="Edit">
                                                    <IconButton>
                                                        <EditRounded fontSize="small" sx={{ color: 'text.secondary'}}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">No Data</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Stack direction="row" paddingTop={3} justifyContent="end">
                        <Pagination
                            color="secondary"
                            count={attendance?.last_page ?? 1}
                            page={attendance.current_page}
                            onChange={(e, page) => fetchData({...filter, page: page})}
                            size="small" />
                    </Stack>
                </CardContent>
            </Card>

            <Link href="/app/attendance/create">
                <Tooltip title="Add Data">
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ position: "fixed", right: "25px", bottom: "15px" }}>
                        <AddRounded />
                    </Fab>
                </Tooltip>
            </Link>

            <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
                <DialogContent>
                    Are you sure want to delete this data?
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={submitDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
