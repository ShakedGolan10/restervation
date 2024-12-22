import { Response } from "express"
import { AddRestaurantRequest, GetRestaurant } from '../../types/request_types'
import { addNewRestaurant } from "./restaurants.service"
import { queryAllDocs, queryById } from "../../models/query_model.service"
import { Restaurants } from "../../models/restaurants"
import { RestaurantModel } from "../../models/index.typegoose"

export async function addRestaurant(req: AddRestaurantRequest, res: Response) {
    try {
        const { name, phone, openingHours } = req.body
        const newRest = await addNewRestaurant(name, phone, openingHours)
        res.status(200).json(newRest)
    } catch (err) {
        console.log('Error caught at controller:', err)
        res.status(500).send({ err: 'Failed to add restaurant' })
    }
}

export async function getRestaurants(req: GetRestaurant, res: Response) {
    try {
    console.log('req')
    const restaurants = await queryAllDocs<typeof Restaurants>({}, RestaurantModel, '-phone')
    res.status(200).json(restaurants)
} catch (err) {
    console.log('Error caught at controller:', err)
    res.status(500).send({ err: 'Failed to get restaurants' })
}
}
export async function getRestaurant(req: GetRestaurant, res: Response) {
    try {
    const restaurant = await queryById<typeof Restaurants>(req.params.restId, RestaurantModel, 'phone')
    res.status(200).json(restaurant)
} catch (err) {
    console.log('Error caught at controller:', err)
    res.status(500).send({ err: 'Failed to get restaurants' })
}
}