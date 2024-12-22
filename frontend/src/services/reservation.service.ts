import { httpService } from "./http.service.ts";

export interface Reservation {
    _id: string;
    tableId: string;
    time: Date;
    slotId: string
    restName: string
  }

export async function saveReservation(time: string | Date, tableId: string, phone: string, slotId: string, restName: string) {
    await httpService.post('reservation', {time, tableId, slotId, phone, restName})
}


export async function getReservationsByPhoneNumber(phone: string) {
    const reservations = await httpService.get<Reservation[]>('reservation', phone)
    return reservations
}

export async function deleteReserv(reservId: string) {
    const reservations = await httpService.delete<Reservation[]>('reservation', reservId)
    return reservations
}

