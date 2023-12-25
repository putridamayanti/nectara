import React, {useState} from "react";
import Breadcrumb from "../../../src/components/Breadcrumb.jsx";
import {
    Button,
    Card,
    CardContent, Chip,
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

export default function Announcement({ announcement }) {
    const { url } = usePage();
    const [filter, setFilter] = useState({ sort: DefaultSort.name.value });
    const [selectedItems, setSelectedItems] = useState([]);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const fetchData = (filter) => {
        return router.get(url, filter,{
            only: ['announcement'],
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
        return Inertia.delete(`/app/announcement/${selectedItems.join(',')}`)
    };

    return (
        <>
            <Breadcrumb
                title="Announcement"
                subtitle="List of course announcement"/>
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
                        groupButtons={[
                            { name: 'All', value: -1 },
                            { name: 'Active', value: 'true' },
                            { name: 'Inactive', value: 'false' },
                        ]}
                        activeButton={filter.active ?? -1}
                    >
                    </EnhancedTableToolbar>
                    <TableContainer>
                        <Table sx={{ whiteSpace: 'nowrap' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {announcement.data.length > 0 ? announcement?.data?.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell padding="checkbox">
                                            <CustomCheckbox
                                                color="primary"
                                                checked={selectedItems.includes(row.id)}
                                                onChange={() => handleSelectItems(row.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>
                                            <Chip
                                                size="small"
                                                color={row.status ? 'success' : 'grey'}
                                                label={row.status ? 'Active' : 'Inactive'}/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Link href={`/app/announcement/${row.id}/edit`}>
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
                            count={announcement?.last_page ?? 1}
                            page={announcement.current_page}
                            onChange={(e, page) => fetchData({...filter, page: page})}
                            size="small" />
                    </Stack>
                </CardContent>
            </Card>

            <Link href="/app/announcement/create">
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: "fixed", right: "25px", bottom: "15px" }}>
                    <AddRounded />
                </Fab>
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
