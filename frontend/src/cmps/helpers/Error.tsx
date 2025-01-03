import React from 'react';
import { Box, Modal, Typography } from '@mui/material';

export function ErrorModal({ error, onClose }:{error: string, onClose: () => void }) {
    
  return (
    <Modal
      open={Boolean(error)}
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
          {`${(error) ? (error.charAt(0).toUpperCase() + error.slice(1)) : 'Somthing went wrong'}, sorry for the inconvinient, please try again.`} 
        </Typography>
      </Box>
    </Modal>
  );
};

