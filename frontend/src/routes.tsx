import React from "react"
import { Rest } from "./pages/rest.tsx"
import { HomePage } from "./pages/home-page.tsx"
import MyReservations from "./pages/reservations.tsx"

// Routes accesible from the main navigation (in AppHeader)
const routes = [

    {
        path: '/',
        component: <HomePage />, 
        label: 'home_page'
    },
    {
        path: 'restaurant/:restId',
        component: <Rest />,
        label: 'Slots'
    },
    {
        path: 'reservations',
        component: <MyReservations />,
        label: 'My Reservations'
    },
   
]

export default routes