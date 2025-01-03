import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllRests, getRest, Restaurant } from '../services/rest.service.ts';
import { endLoader, setError, startLoader } from '../store/system.actions.ts';
import { Box, Typography } from '@mui/material';
import {CalenderCmp} from '../cmps/calender_cmp.tsx';
import { getItem } from '../services/session_storage.service.ts';
import AppCmpWrapper from '../cmps/app_cmp_wrapper.tsx';

function RestPage() {
  const { restId }  = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant>();

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        startLoader()
        const data = await getRest(restId);
        setRestaurant(data);
      } catch (error) {
        setError('Couldnt load restraunts')
        setTimeout(() => window.location.assign('/'), 2000)
      } finally {
        endLoader()
      }
    };
    const sessionData = getItem<Restaurant[]>('rests')
    if (sessionData) {
      const idx = sessionData.findIndex(rest => rest._id === restId)
      if (idx === -1) {
        loadRestaurant()
        getAllRests() // For updating the cache
      } 
        else setRestaurant(sessionData[idx])
    } else loadRestaurant();
  }, [restId]);
  
  if (!restaurant) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Hi, thank you for choosing {restaurant.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Our opening hours are {restaurant.openingHours}. Feel free to schedule a place.
      </Typography>
    </Box>
    <CalenderCmp rest={restaurant} />
    </>
  )
}

export default AppCmpWrapper(RestPage)