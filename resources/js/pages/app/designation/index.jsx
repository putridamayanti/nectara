import React, {useEffect, useState} from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    Fab, FormLabel, IconButton, MenuItem, Pagination, Select, Stack,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow,
    Tooltip
} from "@mui/material";
import EnhancedTableToolbar from "../../../src/components/table/EnhancedTableToolbar.jsx";
import {DefaultSort} from "../../../src/constants/sort.jsx";
import {Inertia} from "@inertiajs/inertia";
import {AddRounded, EditRounded} from "@mui/icons-material";
import CustomCheckbox from "../../../src/components/forms/CustomCheckbox.jsx";
import {router} from "@inertiajs/react";
import {Link, usePage} from "@inertiajs/inertia-react";

export default function Designation({ department, designation }) {
    const { url } = usePage();
    const [filter, setFilter] = useState({ sort: DefaultSort.name.value });
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const fetchData = (filter) => {
        return router.get(url, filter,{
            only: ['designation'],
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
        return Inertia.delete(`/app/designation/${selectedItems.join(',')}`)
    };

    return (
        <>
            <Breadcrumb
                title="Designations"
                subtitle="List of designation"/>
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
                        <Box sx={{ width: '100%' }}>
                            <FormLabel>Department</FormLabel>
                            <Select
                                fullWidth
                                size="small"
                                onChange={(e) => setFilter({...filter, department: e.target.value})}
                                value={filter?.department ?? null}>
                                {department?.map((e, i) => (
                                    <MenuItem key={i} value={e.id}>{e.name}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </EnhancedTableToolbar>
                    <TableContainer>
                        <Table sx={{ whiteSpace: 'nowrap' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {designation.data.length > 0 ? designation?.data?.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell padding="checkbox">
                                            <CustomCheckbox
                                                color="primary"
                                                checked={selectedItems.includes(row.id)}
                                                onChange={() => handleSelectItems(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.department?.name ?? '-'}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Edit">
                                                <Link href={`/app/designation/${row.id}/edit`}>
                                                    <IconButton>
                                                        <EditRounded fontSize="small" sx={{ color: 'text.secondary'}}/>
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
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
                            count={designation?.last_page ?? 1}
                            page={designation.current_page}
                            onChange={(e, page) => fetchData({...filter, page: page})}
                            size="small" />
                    </Stack>
                </CardContent>
            </Card>

            <Tooltip title="Add Data">
                <Link href="/app/designation/create">
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ position: "fixed", right: "25px", bottom: "15px" }}>
                        <AddRounded />
                    </Fab>
                </Link>
            </Tooltip>

            <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
                <DialogContent>
                    Are you sure want to delete this data?
                </DialogContent>
                <DialogActions>
                    <Button color="grey" onClick={() => setDeleteConfirm(false)}>
                        Cancel
                    </Button>
                    <Button color="error" variant="contained" onClick={submitDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
