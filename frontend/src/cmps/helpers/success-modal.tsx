import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AppStore } from '../../store/store';
import { useSelector } from 'react-redux';

// Modal styles
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  maxWidth: 400,
  width: '90%',
};


const SuccessModal = () => {
    
    const successMsg = useSelector((storeState: AppStore) => storeState.systemModule.successMsg);
    const [isModalOpen, setModal] = useState(false)

    useEffect(() => {
      console.log('modal depend triggered')
      if (!successMsg) return 
      setModal(Boolean(successMsg))
    },[successMsg])
  return (
    <Modal open={isModalOpen} onClose={() => setModal(false)} closeAfterTransition>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {`Action succeeded!`}
          </Typography>
          <IconButton onClick={() => setModal(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography sx={{ mt: 2, mb: 3, color: 'text.secondary' }}>
          {successMsg}
        </Typography>
        <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" onClick={() => setModal(false)} color="primary">
              {'OK'}
            </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
