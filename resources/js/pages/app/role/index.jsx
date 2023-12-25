import React, {useState} from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {
    Button,
    Card,
    CardContent, Chip,
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

export default function Role({ role }) {
    const { url } = usePage();
    const [filter, setFilter] = useState({ sort: DefaultSort.name.value });
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const fetchData = (filter) => {
        return router.get(url, filter,{
            only: ['role'],
            preserveState: true,
            preserveScroll: true
        });
    };

    const renderRoleColor = (role) => {
        const item = {label: role.name, color: 'grey'};

        if (role.is_admin) {
            item.color = 'primary';
        } else if (role.id % 3) {
            item.color = 'pink';
        } else if (role.id % 2) {
            item.color = 'success';
        }

        return <Chip label={item.label} color={item.color} size="small"/>
    };

    const handleSelectItems = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(e => e !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const submitDelete = () => {
        return Inertia.delete(`/app/role/${selectedItems.join(',')}`)
    };

    return (
        <>
            <Breadcrumb
                title="Role"
                subtitle="List of role"/>
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
                                    <TableCell>Name</TableCell>
                                    <TableCell>Permission</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {role.data.length > 0 ? role?.data?.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell padding="checkbox">
                                            <CustomCheckbox
                                                color="primary"
                                                checked={selectedItems.includes(row.id)}
                                                onChange={() => handleSelectItems(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.permissions?.length} permissions</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Edit">
                                                <Link href={`/app/role/${row.id}/edit`}>
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
                            count={role?.last_page ?? 1}
                            page={role.current_page}
                            onChange={(e, page) => fetchData({...filter, page: page})}
                            size="small" />
                    </Stack>
                </CardContent>
            </Card>

            <Tooltip title="Add Data">
                <Link href="/app/role/create">
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
