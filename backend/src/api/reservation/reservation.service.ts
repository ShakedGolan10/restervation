import { Injectable } from '@nestjs/common';

import { ClientSession, Types } from 'mongoose';
import { DbService } from '../../nest/services/db.service';
import { Reservations } from '../../db/models/reservations';
import { MongoSession, ReservationsModel, RestaurantModel, SlotsModel } from '../../db/models/index.typegoose';
import { Slots } from '../../db/models/slots';

@Injectable()
export class ReservationsService {
  constructor(private readonly dbService: DbService) {}

  async removeReservation(id: string) {
    const sessionObj = await MongoSession.createInstance();
    try {
      const deletedDoc = await this.dbService.removeDoc(
        id,
        ReservationsModel,
        sessionObj,
      );
      await this._validateTableId(deletedDoc.tableId, deletedDoc.restName)
      if (!deletedDoc) {
        throw new Error('Id wasnt found to delete');
      }
      await this._changeTableAvailability(
        deletedDoc.tableId,
        deletedDoc.slotId,
        sessionObj.session,
      ).catch((err) => {
        throw new Error(`Failed to edit Slot ${err}`);
      });
      await sessionObj.commitTransaction();
    } catch (error) {
      await sessionObj.abortTransaction();
      throw error;
    }
  }

  async addReservation(newReservationData: {time: Date, tableId: string, reservedBy: string, slotId: string, restName: string}) {
    const sessionObj = await MongoSession.createInstance();
    try {
      const {time, tableId, slotId, restName} = newReservationData
      await this._validateTableId(tableId, restName)
      const newReservation = await this.dbService.createDocIfNotExists(
        newReservationData,
        { tableId, time },
        ReservationsModel,
        sessionObj,
      );
      await this._changeTableAvailability(
        tableId,
        slotId,
        sessionObj.session,
      ).catch((err) => {
        throw new Error(`Failed to edit Slot ${err}`);
      });
      await sessionObj.commitTransaction();
      return newReservation;
    } catch (err) {
      await sessionObj.abortTransaction();
      throw err;
    }
  }
  
  private async _changeTableAvailability(
    tableId: string,
    slotId: string,
    session: ClientSession,
  ) {
    try {
      const slotTables = (
        await this.dbService.queryById<typeof Slots, 'tables'>(slotId, SlotsModel, 'tables')
      ).tables
      const updatedTables = slotTables.map((table) => {
        if (table.id === tableId) table.isAvailable = !table.isAvailable;
        return table;
      });
      await SlotsModel.findByIdAndUpdate(slotId, {
        $set: { tables: updatedTables },
      }).session(session);
    } catch (error) {
      throw new Error(
        `Error while trying to change tables availability ${error}`,
      );
    }
  }
  
  private async _validateTableId(tableId:string, restName:string) {
    const {id: restId} = await this.dbService.queryOne({name: restName}, RestaurantModel)
    const {tables} = await this.dbService.queryById(restId, RestaurantModel, 'tables')
    const table = tables.find(table => table.id === tableId)
    if (!table) throw new Error('Coudlnt validate table Id, table doesnt exist')
      return table
  }
}
