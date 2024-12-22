import { Response } from "express"
import { AddReservationRequest, DeleteReservationRequest, GetReservationRequest } from "../../types/request_types"
import { addNewReservation, removeReservation } from "./reservation.service";
import { queryAllDocs } from "../../models/query_model.service";
import { Reservations } from "../../models/reservations";
import { ReservationsModel, SlotsModel } from "../../models/index.typegoose";
import { changeTableAvailability } from "../slots/slots.service";
import { Slots } from "../../models/slots";

export async function addReservation(req: AddReservationRequest, res: Response) {
    try {
        const { time, tableId, phone, slotId, restName } = req.body;
        const newReservation = await addNewReservation(time, tableId, phone, slotId, restName)
        if (!newReservation) throw new Error(`Table is already reserved for this time`)
        await changeTableAvailability(tableId, slotId).catch(err => {throw new Error(`Failed to edit Slot ${err}`)})
        res.status(200).json(newReservation)
    } catch (err) {
        console.log('Error caught at controller:', err)
        res.status(500).send({ err: `Failed to add reservation ${err}` })
    }
}

export async function getReservationsByPhone(req: GetReservationRequest, res: Response) {
    try {
        const { phone } = req.params
        const queryResult = await queryAllDocs<typeof Reservations>({reservedBy: phone}, ReservationsModel)
        res.json(queryResult)
    } catch (err) {
        console.log('Error caught at controller:', err)
        res.status(500).send({ err: 'Failed to get reservation' })
    }
}

export async function deleteReservation(req: DeleteReservationRequest, res: Response) {
    try {
        const { tableId, slotId } = (await removeReservation(req.params.id))
        await changeTableAvailability(tableId, slotId).catch(err => {throw new Error(`Failed to edit Slot ${err}`)})
        res.status(200).json('success deleted reservation')
    } catch (err) {
        console.log('Error caught at controller:', err)
        res.status(500).send({ err: 'Failed to delete reservation' })
    }
}


