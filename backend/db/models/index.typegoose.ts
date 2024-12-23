import { getModelForClass } from '@typegoose/typegoose';
import mongoose, { ClientSession } from 'mongoose';
import { Reservations } from './reservations';
import { Restaurants } from './restaurants';
import { Slots } from './slots';

if (process.env.MONGODB_CONNECTION_STRING) {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
} else throw new Error('MongoDB connection string isnt exist');

const ReservationsModel = getModelForClass(Reservations);
const RestaurantModel = getModelForClass(Restaurants);
const SlotsModel = getModelForClass(Slots);

export class MongoSession {
  public session: ClientSession;

  private constructor(sessionSetted: ClientSession) {
    this.session = sessionSetted;
  }

  public static async createInstance(): Promise<MongoSession> {
    const session = await MongoSession.setInstance();
    return new MongoSession(session);
  }

  private static async setInstance() {
    const session = await mongoose.startSession();
    session.startTransaction();
    return session;
  }

  abortTransaction = async () => {
    await this.session.abortTransaction();
    this.session.endSession();
  };

  commitTransaction = async () => {
    try {
      await this.session.commitTransaction();
      this.session.endSession();
    } catch (error) {
      throw new Error(`Unabled to commit session ${error}`);
    }
  };
}

export { ReservationsModel, RestaurantModel, SlotsModel };
