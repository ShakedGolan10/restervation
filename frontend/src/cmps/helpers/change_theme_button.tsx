import { IconButton, useTheme } from '@mui/material'
import React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../../providers/theme_context_provider.tsx';

export function ChangeThemeBtn() {
    const theme = useTheme();
    const {toggleColorMode, screenSize} = useThemeContext()
  return (
    <IconButton sx={{ ml: 1, position: 'fixed', width: 'max-content', top: (screenSize === 'mobile') ? '0' :'50vh', left:(screenSize === 'mobile') ? '50vw' : '0' }} onClick={toggleColorMode} color="inherit">
    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
  </IconButton>  )
}
