import React, { useState } from 'react'
import { Button as MuiButton, } from '@mui/material'

const Button = (props) => {
    return (
        <MuiButton variant="contained" {...props} />
    );
}

export default Button
