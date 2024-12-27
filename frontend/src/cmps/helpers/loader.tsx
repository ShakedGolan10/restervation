import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export function Loader() {
  
    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            }}
        >
            <CircularProgress />
            <Typography sx={{ mt: 2 }} color="white">
            Loading...
            </Typography>
        </Box>
            )
}
