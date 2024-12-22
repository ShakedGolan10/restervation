import express from 'express'
import { addRestaurant, getRestaurants, getRestaurant } from './restaurants.controller'
const router = express.Router()

router.post('/', addRestaurant)
router.get('/', getRestaurants)
router.get('/:restId', getRestaurant)

export default router