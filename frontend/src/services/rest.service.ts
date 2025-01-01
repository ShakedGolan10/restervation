import { httpService } from "./http.service.ts";

export interface Restaurant {
    phone? : string
    openingHours: string
    name: string
    _id: string
}

export async function addRest(name: string, phone: string, tables: number[], openingHours: string) {
    try {
        const newRest = await httpService.post<Restaurant>('restaurant', {name, phone, openingHours, tables})
        return newRest
    } catch (error) {
        console.log('error cought while trying to add a new restaurant:', error)
        throw new Error(error)
    }
}
export async function getAllRests() {
    try {
        const allRest = await httpService.get<Restaurant[]>('restaurant')
        sessionStorage.setItem('rests', JSON.stringify(allRest))
        return allRest
    } catch (error) {
        throw new Error(error)
    }
}
export async function getRest(restId: string | undefined) {
    try {
        
        const rest = await httpService.get<Restaurant>('restaurant', restId)
        return rest
    } catch (error) {
        throw new Error(error)
    }
}

