'use client'
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme, CssBaseline, Grid, PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import { ChangeThemeBtn } from '../cmps/helpers/change_theme_button.tsx';

const ColorModeContext = createContext({ toggleColorMode: () => {}, screenSize: 'full' });

export function AppThemeProvider({ children } : {children: React.ReactNode}) {

    const [mode, setMode] = useState<PaletteMode>("dark")
    const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "full">("full");

    const isMobile = useMediaQuery('(max-width:660px)');
    const isTablet = useMediaQuery('(max-width:900px)');
    const isFull = useMediaQuery('(max-width:1100px)');

    useEffect(() => {
        if (isMobile) {
            setScreenSize('mobile');
        } else if (isTablet) {
            setScreenSize('tablet');
        } else {
            setScreenSize('full');
        }
    }, [isMobile, isTablet, isFull]);

    const colorMode = useMemo(() => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
          },
        }),
        [],
      )

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode,
                background: {
                  default: mode === 'light'
                      ? '#b0d1f2'
                      : '#450a0a',
              },
            
            },
            typography: {
              fontSize: 16,
              h3: {
                fontSize: (screenSize === 'mobile') ? '3rem' : '5rem'
                
              },
            },
            components: {
                MuiCssBaseline: {
                    styleOverrides: {
                        body: {
                            background: mode === 'light'
                                ? 'linear-gradient(to left ,#f2b0bc, #b0d1f2)'
                                : 'linear-gradient(to left, rgba(10,6,68,1), rgba(69,10,10,1))',
                              },
                    },
                },
            },
        }),
        [mode, screenSize],
    );

        return (
            <ColorModeContext.Provider value={{ ...colorMode, screenSize }}>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <ChangeThemeBtn />
            <Grid container columns={16} >
              {<Grid item xs visibility="hidden" />}
            <Grid item sx={{display: 'flex', justifyContent: 'center'}} xs={screenSize === 'mobile' ? 14 : screenSize === 'tablet' ? 12 : 10}  > 
              {children}
            </Grid>
              {<Grid item xs visibility="hidden" />}
            </Grid>
            </ThemeProvider>
          </ColorModeContext.Provider>
    )};
    
    export function useThemeContext() {
        return useContext(ColorModeContext);
        };
        