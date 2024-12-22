import React, { useState } from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { addRest } from '../services/rest.service.ts';
import { endLoader, setError, startLoader } from '../store/system.actions.ts';
import AppCmpWrapper from './app_cmp_wrapper.tsx';
import { useNavigate } from 'react-router-dom';

function AddRest() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [tables, setTables] = useState([{ capacity: 0, error: '' }]);
  const [openingHours, setOpeningHours] = useState({ from: '', to: '', error: '' });
  const navigate = useNavigate()
  function handleAddTable() {
    setTables([...tables, { capacity: 0, error: '' }]);
  };

  function handleRemoveTable(idx: number) {
    setTables(tables.filter((table, index) => index !== idx));
  };

  function handleTableChange(idx: number, value: string) {
    setTables(tables.map((table, index) => {
      if (index === idx) {
        const capacity = +value
        let error = '';
        if (capacity < 2 || capacity > 8) {
          error = 'Capacity must be between 2 and 8';
        }
        return { ...table, capacity, error };
      }
      return table;
    }));
  };

  function handleOpeningHoursChange(field: 'from' | 'to', value: string) {
    const time = +value;
    let error = '';
    if (time < 0 || time > 24) {
      error = 'Time must be between 0 and 24';
    }
    setOpeningHours({ ...openingHours, [field]: value, error });
  };

  async function saveRest() {
    startLoader()
    try {
      const tablesArray = tables.map((table) => table.capacity);
      const adjustedOpeningHours = `${openingHours.from}-${openingHours.to}`
      const newRest = await addRest(restaurantName, phoneNumber, tablesArray, adjustedOpeningHours);
      navigate(`/restaurant/${newRest._id}`);
    } catch (error) {
      setError()
    } finally {
      endLoader()
    }
  } 

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Add Restaurant
      </Typography>
      <TextField
        label="Owner's Phone Number"
        variant="outlined"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <TextField
        label="Restaurant Name"
        variant="outlined"
        value={restaurantName}
        onChange={(e) => setRestaurantName(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Typography variant="h6" gutterBottom>
        Please pick tables for the restaurant and make it between 2-8
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ mr: 2 }}>
          Tables:
        </Typography>
        <IconButton onClick={handleAddTable}>
          <AddIcon />
        </IconButton>
      </Box>
      {tables.map((table, idx) => (
        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            variant="outlined"
            type="number"
            label="Capacity"
            value={table.capacity}
            onChange={(e) => handleTableChange(idx, e.target.value)}
            inputProps={{ min: 2, max: 8 }}
            error={Boolean(table.error)}
            helperText={table.error}
            sx={{ width: '100px', mr: 2 }}
          />
          <IconButton onClick={() => handleRemoveTable(idx)}>
            <CloseIcon />
          </IconButton>
        </Box>
      ))}
      <Typography variant="h6" gutterBottom>
        Enter your restaurant opening hours
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="From"
          variant="outlined"
          type="number"
          value={openingHours.from}
          onChange={(e) => handleOpeningHoursChange('from', e.target.value)}
          inputProps={{ min: 0, max: 24 }}
          error={Boolean(openingHours.error)}
          helperText={openingHours.error}
          sx={{ width: '100px', mr: 2 }}
        />
        <TextField
          label="To"
          variant="outlined"
          type="number"
          value={openingHours.to}
          onChange={(e) => handleOpeningHoursChange('to', e.target.value)}
          inputProps={{ min: 0, max: 24 }}
          error={Boolean(openingHours.error)}
          helperText={openingHours.error}
          sx={{ width: '100px', mr: 2 }}
        />
      </Box>
      <Button onClick={saveRest} variant="contained" color="primary" sx={{ mt: 3 }}>
        Save Restaurant
      </Button>
      
    </Box>
  );
}

export default AppCmpWrapper(AddRest)