import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes.tsx'
import { Container } from '@mui/material'
import { Navbar } from './cmps/nav_bar.tsx'
import SuccessModal from './cmps/helpers/success-modal.tsx'




export function RootLayout() {
  
  return (
    <>
    <Navbar />
    <SuccessModal />
    <Container sx={{minHeight: '100vh',padding: '0 0 0 0' ,marginTop: '60px' , maxHeight: 'max-content', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
    <Routes>
      {routes.map((route) => (
      <Route
        key={route.path}
        element={route.component}
        path={route.path}
      />
      ))}
    </Routes>           
    </Container>
    </>    

  )
}
