import * as React from 'react';
import { Box } from '@mui/material';

import Navbar from '../components/Navbar';
import SingleLibrary from '../components/SingleLibrary';

export default function Library({ libraries }) {
    return (
        <Box sx={{
            display: 'flex;',
            flexDirection: 'column;',
            minHeight: '100vh;',
            bgcolor: '#272424;',
        }}>
            <Navbar username={'Example Username'} />
            <Box sx={{
            display: 'flex;',
            flexDirection: 'column;',
            minHeight: '100vh;',
            justifyContent: 'center;'
        }}>
            <SingleLibrary libraries={libraries} />
            </Box>
        </Box>
    )
}