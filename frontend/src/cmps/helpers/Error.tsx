import React from 'react';
import { Box, Modal, Typography } from '@mui/material';

export function ErrorModal({ error, onClose }:{error: boolean, onClose: ()=> void }) {
    
  return (
    <Modal
      open={error}
      onClose={onClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'coral',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography id="error-modal-title" variant="h6" component="h2">
          Error occured please try again
        </Typography>
      </Box>
    </Modal>
  );
};

