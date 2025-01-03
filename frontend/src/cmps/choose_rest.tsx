import React, { useState, useEffect } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllRests, Restaurant } from '../services/rest.service.ts';
import AppCmpWrapper from './app_cmp_wrapper.tsx';
import { endLoader, setError, startLoader } from '../store/system.actions.ts';

function ChooseRest() {
  const [rests, setRests] = useState<Restaurant[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRests = async () => {
      try {
        startLoader()
        const data = await getAllRests();
        setRests(data);
      } catch (error) {
        setError('Couldnt load rests at the moment')
        window.location.assign('/')
      } finally {
        endLoader()
      }
    };
    loadRests();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Choose a Restaurant
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {rests.map((rest) => (
          <Card 
          key={rest._id} 
          sx={{ minWidth: '200px', m: 2 }} 
          onClick={() => handleCardClick(rest._id)}
          >
          <CardActionArea>
              <CardContent>
                <Typography variant="h4" component="div">
                  {rest.name}
                </Typography>
                <Typography variant="h6" component="div">
                  Opening hours: {rest.openingHours}
                </Typography>
              </CardContent>
              </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AppCmpWrapper(ChooseRest);
