import { MongoSession, ReservationsModel, SlotsModel } from "../../models/index.typegoose"
import { Types } from "mongoose"

export async function addNewReservation(time: Date, tableId: string, phone: string, slotId:string, restName: string) {
    const { abortTransaction, commitTransaction, session } = await MongoSession.createInstance()
    try {
        const existingReservation = await ReservationsModel.findOne({
            tableId,
            time,
            })
  
        if (existingReservation) {
            abortTransaction()
            return false
        }

        const newReservation = await new ReservationsModel({
            time,
            tableId,
            reservedBy: phone,
            slotId, 
            restName
        }).save({ session });

        
        await commitTransaction()
        return newReservation
    } catch (error) {
        abortTransaction()
        throw new Error(`Error catched at mongoDB while tried w/r actions : ${error}`)
    }
}

export async function removeReservation(id: string) {
    const { abortTransaction, commitTransaction, session } = await MongoSession.createInstance()
    try {
            const deletedTable = await ReservationsModel.findByIdAndDelete(
                new Types.ObjectId(id)
            ).session(session)
            await commitTransaction()
            return deletedTable
        } catch (error) {
        abortTransaction()
        throw new Error(`Error catched at mongoDB while trying to delete : ${error}`)
    }
}