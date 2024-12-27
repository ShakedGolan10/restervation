import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography, Grid } from '@mui/material';
import { endLoader, startLoader, setError} from '../store/system.actions.ts';
import { deleteReserv, getReservationsByPhoneNumber, Reservation } from '../services/reservation.service.ts';
import AppCmpWrapper from '../cmps/app_cmp_wrapper.tsx';



function MyReservations() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reservations, setReservations] = useState<Reservation[]>([]);

  async function cancelReserv(reservId: string) {
    startLoader()
    try {
      await deleteReserv(reservId)
      setReservations(prev => prev.filter(reserv => reserv._id !== reservId))
    } catch (error) {
      setError()
    } finally {
      endLoader()
    }
  }
  
  async function handleFetchReservations() {
    startLoader();
    try {
      let data = await getReservationsByPhoneNumber(phoneNumber);
      setReservations(data);
    } catch (error) {
      setError();
    } finally {
      endLoader();
    }
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>Welcome to my reservations</Typography>
      <Typography variant="h6">Please enter your phone number and submit</Typography>
      <TextField
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        label="Phone Number"
        variant="outlined"
        sx={{ mb: 2, width: '300px' }}
      />
      <Button onClick={handleFetchReservations} variant="contained" color="primary">Submit</Button>
      <Box sx={{ mt: 5, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} justifyContent="center">
          {reservations.map((reservation) => (
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
