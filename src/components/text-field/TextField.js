import { TextField as MuiTextField, Box, } from '@mui/material'

const TextField = (props) => {
    return (
        <Box sx={{ paddingTop: '2rem', }}>
            <MuiTextField sx={{ minWidth: '600px' }} variant="outlined" {...props} />
        </Box>
    )
}

export default TextField