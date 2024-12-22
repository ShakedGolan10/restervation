import { Request } from "express"

export interface AddRestaurantRequest extends Request {
	body: {
		name: string;
		phone: string,
		openingHours: string // hh:hh
	};
}
export interface GetRestaurant extends Request {
	params: {
		restId?: string;
	};
}

export interface TableRequest extends Request {
	params: {
        restId?: string
    }
    body: {
		tables: number[];
	};
}

export interface AddReservationRequest extends Request {
    body: {
		tableId: string,
		slotId: string,
		phone: string,
        time: Date,
		restName: string
	};
}

export interface GetReservationRequest extends Request {
    params: {
        phone: string,
	};
}

export interface DeleteReservationRequest extends Request {
    params: {
        id: string,
	};

}

export interface SlotsRequest extends Request {
	params: {
		restId: string
	},
	query: {
		time: string
	}
	
}