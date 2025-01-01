import React from "react"
import RestPage from "./pages/rest-page.tsx"
import HomePage from "./pages/home-page.tsx"
import MyReservations from "./pages/reservations-page.tsx"

// Routes accesible from the main navigation (in AppHeader)
const routes = [

    {
        path: '/',
        component: <HomePage />, 
        label: 'home_page'
    },
    {
        path: 'restaurant/:restId',
        component: <RestPage />,
        label: 'Slots'
    },
    {
        path: 'reservations',
        component: <MyReservations />,
        label: 'My Reservations'
    },
   
]

export default routes