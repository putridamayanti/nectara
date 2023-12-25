import React, {useEffect, useState} from "react";
import MuiPhoneNumber from 'mui-phone-number';

const PhoneInput = ({ onChange, value }) => {
    const handleChange = (value) => {
        onChange(value);
    };

    return (
        <MuiPhoneNumber
            fullWidth
            defaultCountry={'us'}
            onChange={handleChange}
            value={value}
            variant="outlined"/>
    )
};

export default PhoneInput;
