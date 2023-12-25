import React from "react";
import countries from '/public/data/countries.json';
import {Autocomplete, Box, TextField} from "@mui/material";

const CountrySelect = (props) => {
    const { showCurrency, onChange, defaultValue, value } = props;

    return (
        <Autocomplete
            fullWidth
            options={countries}
            autoHighlight
            sx={{
                '.MuiOutlinedInput-root': {
                    padding: '4.5px 10px'
                }
            }}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => onChange(value)}
            value={defaultValue ? countries.find(e => e.code === defaultValue) : value}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.replace(/.$/, "").toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.replace(/.$/, "").toLowerCase()}.png`}
                        alt=""
                    />
                    {option.name} {showCurrency && option.currency}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    sx={{
                        padding: 0
                    }}
                    {...params}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
};

export default CountrySelect;
