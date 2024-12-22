import express from 'express'
import { addReservation, deleteReservation, getReservationsByPhone } from './reservation.controller'
const router = express.Router()

router.get('/:phone', getReservationsByPhone)
router.post('/', addReservation)
router.delete('/:id', deleteReservation)

export default router
