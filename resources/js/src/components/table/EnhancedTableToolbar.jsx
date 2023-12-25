import React from "react";
import {
    Box, Button, ButtonGroup,
    FormLabel,
    IconButton,
    InputAdornment,
    Menu, MenuItem, Select, Stack,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import {DeleteRounded, FilterListRounded, SearchRounded} from "@mui/icons-material";
import {useState} from "react";
import {BasicSort} from "../../constants/sort.jsx";
import PropTypes from "prop-types";

const EnhancedTableToolbar = (props) => {
    const {
        children,
        filter,
        handleChange,
        numSelected,
        onDelete,
        sortItems,
        groupButtons,
        activeButton
    } = props;

    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [tempFilter, setTempFilter] = useState(filter);

    const handleSearch = (e) => {
        setTempFilter({ ...filter, keyword: e.target.value});
        handleChange({...filter, keyword: e.target.value});
    };

    if (numSelected > 0) {
        return (
            <Toolbar
                sx={{
                    pl: 2,
                    pr: { xs: 0, sm: 1 },
                    borderRadius: 2,
                    background: (theme) => theme.palette.primary.light,
                }}>
                <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
                    {numSelected} selected
                </Typography>
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete}>
                        <DeleteRounded width="18" />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        )
    }

    return (
        <Toolbar
            sx={{
                pl: { xs: 0 },
                pr: { xs: 0, sm: 1 },
                borderRadius: 2,
                gap: 10
            }}
        >
            <Stack direction="row" spacing={3} flex={1}>
                <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded fontSize="small"/>
                                </InputAdornment>
                            ),
                        }}
                        placeholder="Type your keyword ..."
                        size="small"
                        onChange={(e) => handleSearch(e)}
                        value={tempFilter?.keyword}
                    />
                </Box>

                {groupButtons?.length > 0 && (
                    <ButtonGroup variant="outlined" size="small">
                        {groupButtons.map((e, i) => (
                            <Button
                                key={i}
                                variant={activeButton === e.value ? 'contained' : 'outlined'}
                                onClick={() => handleChange({'status': e.value})}>
                                {e.name}
                            </Button>
                        ))}
                    </ButtonGroup>
                )}
            </Stack>

            <Button
                startIcon={<FilterListRounded size="1.2rem" />}
                onClick={(e) => setFilterAnchorEl(e.currentTarget)}>
                Filter
            </Button>
            <Menu
                anchorEl={filterAnchorEl}
                id="account-menu"
                open={Boolean(filterAnchorEl)}
                onClose={() => setFilterAnchorEl(null)}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        minWidth: { xs: '90%', md: '50%', lg: 350 },
                        borderRadius: 3,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.5,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Stack spacing={2} padding={2}>
                    <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                        <TextField
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRounded fontSize="small"/>
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Type your keyword ..."
                            size="small"
                            onChange={(e) => handleSearch(e)}
                            value={tempFilter?.keyword}
                        />
                    </Box>
                    <Box>
                        <FormLabel sx={{ fontSize: 12 }}>Sort By</FormLabel>
                        <Select
                            fullWidth
                            size="small"
                            onChange={(e) => setTempFilter({...filter, sort: e.target.value})}
                            value={tempFilter.sort}>
                            {Object.keys(sortItems || BasicSort).map(key => (
                                <MenuItem key={key} value={(sortItems || BasicSort)[key].value}>
                                    {(sortItems || BasicSort)[key].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    {children}

                    <Button
                        fullWidth
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() => {
                            handleChange(tempFilter);
                            setFilterAnchorEl(null);
                        }}>
                        Search
                    </Button>
                </Stack>
            </Menu>
        </Toolbar>
    )
};

EnhancedTableToolbar.propTypes = {
    onDelete: PropTypes.func
};

export default EnhancedTableToolbar;
