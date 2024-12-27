import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import AddRest from '../cmps/add_rest.tsx';
import ChooseRest from '../cmps/choose_rest.tsx';

export function HomePage() {

    const [selectedOption, setSelectedOption] = useState<string>('');

    const handleOptionClick = (option: string) => {
      setSelectedOption(option);
    };
  
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
        <Box textAlign="center" my={5}>
          <Typography variant="h3" component="h1" gutterBottom textAlign={'center'}>
            Welcome to Our Reservation System
          </Typography>
          <Typography variant="h6" component="h2" fontSize="">
            Please select an option below
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: 'background.default', border: selectedOption === 'restaurant' ? '2px solid' : 'none',
              borderColor: selectedOption === 'restaurant' ? 'primary.main' : 'transparent', opacity: selectedOption === 'restaurant' ? '50%' : '100%'}}>
              <CardActionArea onClick={() => handleOptionClick('restaurant')}>
                <CardContent>
                  <Typography variant="h6" component="div" textAlign={'center'}>
                    Restaurant
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ bgcolor: 'background.default', border: selectedOption === 'guest' ? '2px solid' : 'none',
              borderColor: selectedOption === 'guest' ? 'primary.main' : 'transparent', opacity: selectedOption === 'guest' ? '50%' : '100%'}}>
              <CardActionArea onClick={() => handleOptionClick('guest')}>
                <CardContent>
                  <Typography variant="h6" component="div" textAlign={'center'}>
                    Guest
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        {(selectedOption === 'guest') && <ChooseRest />}
        {(selectedOption === 'restaurant') && <AddRest />}
      </Container>
    );
}
