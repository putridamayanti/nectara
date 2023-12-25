import React, {useState} from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {
    Button,
    Card,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    Fab, IconButton, Pagination, Stack,
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
import dayjs from "dayjs";

export default function Expense({ expense, setting }) {
    const { url } = usePage();
    const [filter, setFilter] = useState({ sort: DefaultSort.name.value });
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const fetchData = (filter) => {
        return router.get(url, filter,{
            only: ['expense'],
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
        return Inertia.delete(`/app/expense/${selectedItems.join(',')}`)
    };

    return (
        <>
            <Breadcrumb
                title="Expense"
                subtitle="List of expense"/>
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
                    </EnhancedTableToolbar>
                    <TableContainer>
                        <Table sx={{ whiteSpace: 'nowrap' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expense.data.length > 0 ? expense?.data?.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell padding="checkbox">
                                            <CustomCheckbox
                                                color="primary"
                                                checked={selectedItems.includes(row.id)}
                                                onChange={() => handleSelectItems(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{setting?.currency} {row.amount}</TableCell>
                                        <TableCell>{row.date ? dayjs(row.date).format('DD MMM YYYY') : '-'}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Edit">
                                                <Link href={`/app/expense/${row.id}/edit`}>
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
                            count={expense?.last_page ?? 1}
                            page={expense.current_page}
                            onChange={(e, page) => fetchData({...filter, page: page})}
                            size="small" />
                    </Stack>
                </CardContent>
            </Card>

            <Tooltip title="Add Data">
                <Link href="/app/expense/create">
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
                    <Button color="error" variant="contained" onClick={submitDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
