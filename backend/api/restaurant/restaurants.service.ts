import { RestaurantModel } from '../../models/index.typegoose'
import { Restaurants } from '../../models/restaurants'
import { queryAllDocs, QueryReturnType } from '../../models/query_model.service'

export async function addNewRestaurant(name: string, phone: string, openingHours: string): Promise<QueryReturnType<typeof Restaurants> | void> {
    try {
        const existingRestaurant = await queryAllDocs<typeof Restaurants>({phone, name}, RestaurantModel)
        if (existingRestaurant.length) throw new Error(`Restaurant already exist!`)
        const newRest = await RestaurantModel.create({
            name,
            phone,
            openingHours
        })
        return newRest
    } catch (error) {
        throw new Error(`Unable to create new restaurant doc at mongo: ${error}`)
    }
}

