import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Card } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, addDays, isSameDay } from 'date-fns';
import Slots from './slots/slots.tsx';

export function CalenderCmp({ rest }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (newValue: any) => {
    const newDate = new Date(newValue);
    setSelectedDate(newDate);
  };

  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(addDays(today, i));
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ mt: 5, padding: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <DatePicker
            label="Select a date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} sx={{ p: 2, mb: 2, textAlign: 'center' }} />}
            minDate={today}
            maxDate={addDays(today, 6)}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2} justifyContent="center">
            {days.map((date, index) => (
              <Grid item key={index} xs>
                <Card
                  elevation={3}
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isSameDay(date, selectedDate) ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                    }
                  }}
                  onClick={() => handleDateChange(date)}
                >
                  <Typography variant="h6">
                    {format(date, 'EEEE')}
                  </Typography>
                  <Typography variant="body1">
                    {format(date, 'MMMM d')}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </LocalizationProvider>
      {selectedDate && <Slots rest={rest} selectedDate={selectedDate} />}
    </>
  );
}
