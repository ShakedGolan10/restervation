import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';


export function AddReservationModal ({ open, onClose, onConfirm, tableCapacity }) {
  const [stage, setStage] = useState(1);
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState(0);
  const [error, setError] = useState('');
  function handleConfirm() {
    if (people > tableCapacity) {
      setError(`The max capacity of this table is ${tableCapacity}`);
    } else {
      onConfirm(phone);
    }
  };


  return (
    <Modal sx={{zIndex: 50}} open={open} onClose={onClose}>
      <Box sx={{ width: 300, p: 4, backgroundColor: 'coral', margin: 'auto', mt: '20%' }}>
        {stage === 1 ? (
          <>
            <Typography variant="h6">Do you want to reserve this table?</Typography>
            <Button onClick={() => setStage(2)}>Confirm</Button>
            <Button onClick={onClose}>Abort</Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Please enter your phone number</Typography>
            <TextField value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6">How many people would you be?</Typography>
            <TextField type="number" value={people} onChange={(e) => (e.target.value) ? setPeople(+e.target.value) : setPeople(0)} fullWidth />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button onClick={handleConfirm} sx={{ mt: 2 }}>Submit</Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

