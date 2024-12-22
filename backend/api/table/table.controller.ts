import { Response } from "express"
import { TableRequest } from "../../types/request_types"
import { addTablesToRest } from "./table.service"
import { createNewSlots } from "../slots/slots.service"

export async function addTables(req: TableRequest, res: Response) {
    try {
        const { restId } = req.params
        const { tables } = req.body

        await addTablesToRest(restId, tables)
        await createNewSlots(restId) 
        res.status(200).json('Success')
    } catch (err) {
        console.log('Error caught at controller:', err)
        res.status(500).send({ err: `Failed to add table ${err}` })
    }
}

