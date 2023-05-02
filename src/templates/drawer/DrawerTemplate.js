import React, { useState } from 'react'
import { Button, } from 'components'
import { Box, Typography, } from '@mui/material'

const DrawerTemplate = (props) => {
    const { children } = props
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                flexDirection: 'column',

                paddingLeft: '240px',
            }}
        >
            {children}
        </Box>
    );
}

export default DrawerTemplate
