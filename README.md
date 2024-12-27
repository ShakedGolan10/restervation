# Restaurant Reservation System Architecture

The Restaurant Reservation System allows customers to make reservations for tables at a restaurant.

## Requirements

- Reservations are exactly 60 minutes and start only at exact hours.
- Tables can host between 2-8 people.
- Reservations can only be made if a large enough table is available for the entire duration.
- Users can cancel their reservations.

## Views

- **List of all available slots**: Displays available slots with times and tables.
- **List of all slots**: Displays all slots with availability indication.
- **Slot view**:
  - Display the slot (time + table).
  - Allow user to reserve the table (if available).
  - Allow user to cancel their reservation.

## Client-Side

- **Framework**: React/Next.js
- **State Management**: Redux
- **Styling**: MaterialUI
- **API Communication**: Axios

### Components

- **AvailableSlotsList**: Displays all available slots with times and tables.
- **AllSlotsList**: Displays all slots with availability indications.
- **SlotView**: Allows viewing, reserving, and canceling reservations for a specific slot.

## Server-Side

- **Framework**: Node.js with Express
- **Database**: MongoDB
- **ORM**: Typegoose

## API Endpoints

### Slots

- **GET** `/api/slots/:restId` Fetch all available slots.
  - Getting all slots
  - Filter on front to see only available

### Reservation

- **GET** `/api/reservation/:phone` Fetch all reservations with this phone number.
- **POST** `/api/reservation` Reserve a slot, body: `{time, tableId, phone, slotId, restName}`
- **DELETE** `/api/reservation/:reservationId` Cancel a reservation

### Restaurant

- **POST** `/api/restaurant/` body: `{name: X, phone: Y}` - returns restId
- **GET** `/api/restaurant/` Return all restaurants
- **GET** `/api/restaurant/:restId` Return a restaurant

### Table

- **POST** `/api/table/:restId` body: `{tables: [capacity]}`

## Database Models and Structure

### Restaurants

Represents the restaurant:

- Fields:
  - `id`: ObjectId
  - `name`: string
  - `phone`: string
  - `openingHours`: hh:hh
  - `tables`: [{
    - `id`: string
    - `capacity`: number
      }]

### Reservations

Represents a reservation for a slot.

- Fields:
  - `id`
  - `time`
  - `tableId`
  - `reservedBy`
  - `slotId`
- Key points:
  - `reservedBy` is the unique user phone number

### Slots

Represents a slot of time in a specific restaurant.

- Fields:
  - `restId`: ref to Restaurants
  - `time`: Date (start of every hour at restaurant opening hours)
  - `tables`: [{
    - `tableId`: string
    - `capacity`: number
    - `isAvailable`: boolean
      }]
- Key points:
  - `reservedBy` is the unique user phone number

## Concurrency and Race Conditions

- **Transaction Management**: Use transactions to ensure atomicity of operations during reservations and cancellations using the Mongoose session feature.

## Data Flow

### Creating a Restaurant

1. Frontend asks the user to pick a name and enter a phone number.
2. Frontend sends a POST call to `/api/restaurant`.
3. Backend returns a new restId after creating the restaurant in the database.
4. Frontend asks the user to create tables for the restaurant.
5. Frontend sends a POST call to `/api/table/:restId` with body: `{tables: [capacity]}`.
6. Backend saves the tables in the Restaurants collection and in every Slot. Configuring the slots for the first time can take a while and will be displayed to the user.

### Get All Slots

1. Frontend sends a request to the backend to route `/api/slots/:restId`.
2. Backend fetches all the slots with the date the user looks at and from the unique restId.
3. Backend returns the slots value to the client.
4. Frontend gets an array of slots, each containing available and reserved tables, and can filter accordingly.

### Reservation Request

1. User selects a slot and submits a reservation request.
2. Frontend sends a request to POST `/api/reserve` with body: `{time, tableId, phone, slotId}`.
3. Backend checks availability, starts a session, and processes the reservation, creating the reservation and assigning it the slotId.
4. Backend updates the database and commits the session.
5. Backend updates the availability of the table in the slotId.
6. Frontend updates the UI based on the response.
7. Frontend saves the reservation in the cache.

### Cancellation Request

1. User presses the cancel reservation button and a modal opens:
   - If the user has a reservation saved in the cache, they can choose it and submit the cancellation request.
   - If not:
     a. Frontend asks for the user's phone number.
     b. Frontend sends a request to the backend with the phone number.
     c. Backend returns the user's reservations and the user can choose which to cancel.
2. Backend verifies the reservation, processes the cancellation, and updates the database and the slot availability.
3. Frontend updates the UI based on the response and displays a success message.

## Future Enhancements

- Make one single design for modals.
- Ensure there will always be slots for a week ahead from the current time.
- Better success and error handling:
  - Display success messages upon success.
  - Display the error occurring.
