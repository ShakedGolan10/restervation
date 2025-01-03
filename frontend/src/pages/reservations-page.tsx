import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography, Grid } from '@mui/material';
import { deleteReserv, getReservationsByPhoneNumber, Reservation } from '../services/reservation.service.ts';
import AppCmpWrapper from '../cmps/app_cmp_wrapper.tsx';
import { useAsync } from '../hooks/useAsync.ts';



function MyReservations() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservations, setReservations] = useState<Reservation[] | undefined>([]);
  const [ executeAsyncFunc ] = useAsync()
  
  async function cancelReserv(reservId: string) {
      executeAsyncFunc({
        asyncOps: [() => deleteReserv(reservId)],
        successMsg: 'Canceled reservation successfuly',
        errorMsg: 'Couldnt delete reservation'
      })
      setReservations(prev => (prev as Reservation[]).filter(reserv => reserv._id !== reservId))
  }
  
  async function handleFetchReservations() {
    const data = executeAsyncFunc<[Reservation[]]>({
      asyncOps: [() => getReservationsByPhoneNumber(phoneNumber)],
      errorMsg: 'Couldnt get reservation'
    })
    if (!data[0]) setReservations(undefined)
    else setReservations(data[0]);
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', gap: '50px', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>Welcome to my reservations</Typography>
      <Typography variant="h6">Please enter your phone number and submit</Typography>
      <TextField
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        label="Phone Number"
        variant="outlined"
        sx={{ mb: 2, width: '300px' }}
      />
      <Button onClick={handleFetchReservations} variant="contained" color="primary" disabled={Boolean(phoneNumber.length < 10)}>Submit</Button>
      <Box sx={{ mt: 5, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          {!reservations ? 
            <Typography variant='h6'>
              There are no reservations available
            </Typography>
          : (reservations as Reservation[]).map((reservation) => (
            <Grid item key={reservation._id} xs={12} sm={6}>
              <Card sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">
                  {new Date(reservation.time).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Restaurant name: {reservation.restName}
                </Typography>
                <Button
                onClick={() => cancelReserv(reservation._id)}
                variant="contained"
                color="error"
                  sx={{ color: 'white', width: '200px', margin: '5px 5px 5px 5px', '&:hover': {
                      backgroundColor: 'darkred',
                    }}}>
                  Cancel Reservation
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AppCmpWrapper(MyReservations) 
