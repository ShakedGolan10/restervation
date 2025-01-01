import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../providers/theme_context_provider.tsx';

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { screenSize } = useThemeContext();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/reservations">
          <ListItemText primary="My Reservations" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Restervation
        </Typography>
        {screenSize === 'mobile' ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {menuItems}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/reservations" color="inherit">
              My Reservations
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
