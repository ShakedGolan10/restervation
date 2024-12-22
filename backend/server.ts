require('dotenv').config()
import express from 'express'
import cors, { CorsOptions } from 'cors'
import path from 'path'
import { createServer } from 'http';
const app = express()
const http = createServer(app);

// Express App Config
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions: CorsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3030'],
        credentials: false
    }
    app.use(cors(corsOptions))
}

import slotsRoutes from './api/slots/slots.routes'
import reservationRouts from './api/reservation/reservation.routes'
import restaurantRouts from './api/restaurant/restaurants.routes'
import tableRoutes from './api/table/table.routes'

// routes

app.use('/api/slots', slotsRoutes)
app.use('/api/reservation', reservationRouts)
app.use('/api/restaurant', restaurantRouts)
app.use('/api/table', tableRoutes)

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// }) 
// Didnt do build so I left this out.


const port = process.env.PORT || 3030
http.listen(port, () => {
    console.log('Server is running on port: ' + port)
})